#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bluebird_1 = require("bluebird");
const pg_1 = __importDefault(require("pg"));
const ramda_1 = require("ramda");
const yargs_1 = __importDefault(require("yargs"));
const date_fns_1 = require("date-fns");
// Global exception handlers
process.on('uncaughtException', bail);
process.on('unhandledRejection', bail);
class SeedRunner {
    constructor(flags) {
        this.dbOptions = {
            host: process.env.PGHOST || 'localhost',
            database: process.env.PGDATABASE || 'postgres',
            user: process.env.PGUSER || 'postgres',
            password: process.env.PGPASSWORD || '123456',
            port: Number(process.env.PGPORT) || 5432
        };
        this.dateFieldIds = new Set([
            1114,
            1184,
            1082 // Date
        ]);
        this.escape = (value) => {
            var _a;
            switch ((_a = value) === null || _a === void 0 ? void 0 : _a.__proto__.constructor) {
                case String:
                    return this.client.escapeLiteral(value);
                case Object:
                case Array:
                    return `'${JSON.stringify(value)}'`;
                default:
                    return (value !== null && value !== void 0 ? value : 'null');
            }
        };
        this.dryRun = Boolean(flags.dry);
        this.failOnUpdates = Boolean(flags.failOnUpdates);
        this.client = new pg_1.default.Client(this.dbOptions);
        const hasColors = !process.env.OMIT_COLORS;
        this.colors = hasColors
            ? { blue: '\u001b[34m',
                yellow: '\u001b[33m',
                green: '\u001b[32m',
                reset: '\u001b[0m' }
            : { blue: 'U',
                yellow: '.',
                green: 'I',
                reset: '' };
        this.marker = hasColors ? '#' : '';
    }
    async connect() {
        await this.client.connect();
    }
    async startTransaction() {
        await this.client.query('BEGIN TRANSACTION');
        await this.client.query('SET CONSTRAINTS ALL DEFERRED');
    }
    async endTransaction() {
        await this.client.query(this.dryRun ? 'ROLLBACK' : 'COMMIT');
        await this.client.end();
    }
    formatRowToSQL(row) {
        return {
            keys: ramda_1.keys(row).map(k => `"${k}"`).join(', '),
            values: ramda_1.values(row).map(this.escape).join(', ')
        };
    }
    async apply(seedName, timeShift) {
        await this.startTransaction();
        const interval = await this.secondsFromTimeShift(timeShift);
        const data = this.readJSON(seedName);
        for (const table of data) {
            console.log(`\n---- ${table.name}: ${table.rows.length} rows to insert`);
            const primaryKeys = await this.getPrimaryKeys(table.name);
            const defaultKeys = await this.getKeysWithDefault(table.name);
            const applyTimeShift = await this
                .getTimeShiftFn(table.name, interval);
            if (primaryKeys.length === 0) {
                throw new Error(`${table.name} has no primary keys!`);
            }
            for (const jsonRow of table.rows) {
                const row = applyTimeShift(jsonRow);
                const primaryQuery = ramda_1.zip(primaryKeys, ramda_1.props(primaryKeys, row))
                    .map(([key, value]) => `"${key}" = '${value}'`)
                    .join(' AND ');
                const existingRow = ramda_1.head(await this.loadRows(`SELECT * FROM ${table.name} WHERE ${primaryQuery}`, defaultKeys));
                let color = this.colors.green;
                if (existingRow) {
                    if (ramda_1.equals(row, existingRow)) {
                        color = this.colors.yellow;
                    }
                    else {
                        color = this.colors.blue;
                        if (this.failOnUpdates) {
                            this.reportMismatches(row, existingRow);
                            throw new Error('Seed mismatches found.');
                        }
                        await this.update(row, primaryQuery, table);
                    }
                }
                else {
                    await this.insert(row, table);
                }
                process.stdout
                    .write(`${color}${this.marker}${this.colors.reset}`);
            }
            console.log();
        }
        await this.endTransaction();
    }
    reportMismatches(row, existingRow) {
        console.log('Seed:');
        console.dir(row);
        console.log('Database:');
        console.dir(existingRow);
    }
    async toJSON(schemas, tableFilter = '') {
        await this.startTransaction();
        const tableRegex = new RegExp(tableFilter);
        const tables = ramda_1.unnest(await bluebird_1.all(schemas
            .sort()
            .map(async (schema) => this.getAllTablesFromSchema(schema))))
            .filter(name => tableRegex.test(name));
        let output = await bluebird_1.all(tables.map(async (name) => {
            const keys = (await this.getPrimaryKeys(name))
                .map(key => `"${key}"`)
                .join(', ');
            const defaultKeys = await this.getKeysWithDefault(name);
            const rows = await this.loadRows(`SELECT * FROM ${name} ORDER BY ${keys}`, defaultKeys);
            return { name, rows };
        }));
        output = output.filter(({ rows }) => rows.length > 0);
        console.log(JSON.stringify(output, null, 4));
        await this.endTransaction();
    }
    getIndex(primaryKeys, row) {
        const index = [];
        for (const key of primaryKeys) {
            index.push(row[key]);
        }
        return index.join(':');
    }
    async createIndex(seed) {
        const index = new Set();
        for (const table of seed) {
            const primaryKeys = await this.getPrimaryKeys(table.name);
            for (const row of table.rows) {
                index.add(`${table.name}:${this.getIndex(primaryKeys, row)}`);
            }
        }
        return index;
    }
    async remove(seed, index) {
        const newSeed = [];
        for (const table of seed) {
            const rows = [];
            const primaryKeys = await this.getPrimaryKeys(table.name);
            for (const row of table.rows) {
                const key = `${table.name}:${this.getIndex(primaryKeys, row)}`;
                if (!index.has(key)) {
                    rows.push(row);
                }
            }
            if (rows.length > 0) {
                newSeed.push({ name: table.name, rows });
            }
        }
        return newSeed;
    }
    async complement(seedName, complementName) {
        const complementData = this.readJSON(complementName);
        const complementIndex = await this.createIndex(complementData);
        const seed = this.readJSON(seedName);
        console.log(JSON.stringify(await this.remove(seed, complementIndex), null, 4));
        await this.client.end();
    }
    async secondsFromTimeShift(timeShift) {
        if (!timeShift) {
            return 0;
        }
        const result = await this.client.query(`SELECT extract(epoch FROM interval '${timeShift}') "interval"`);
        return result.rows[0].interval;
    }
    async getTimeShiftFn(table, interval) {
        const result = await this.client.query(`SELECT * FROM ${table} LIMIT 0`);
        const fields = ramda_1.zip(ramda_1.pluck('name', result.fields), result.fields);
        const transformDate = (date) => date_fns_1.addSeconds(date_fns_1.parseISO(date), interval).toJSON();
        const dateFieldsTransformer = fields
            .filter(([_, fieldDefinition]) => this.dateFieldIds.has(fieldDefinition.dataTypeID))
            .map(field => ({ [field[0]]: transformDate }));
        return ramda_1.evolve(ramda_1.mergeAll(dateFieldsTransformer));
    }
    async loadRows(query, keysWithDefault) {
        const result = await this.client.query(query);
        const fields = ramda_1.zipObj(ramda_1.pluck('name', result.fields), result.fields);
        const normalize = ramda_1.pipe(ramda_1.mapObjIndexed((value, key) => {
            const typeId = fields[key].dataTypeID;
            if (value === null) {
                return keysWithDefault.has(key)
                    ? null
                    : undefined;
            }
            if (typeId === 1009) { // Text[]
                return `{ ${value.join(', ')} }`;
            }
            if (this.dateFieldIds.has(typeId)) {
                return value.toJSON();
            }
            return value;
        }), ramda_1.reject(value => value === undefined));
        return ramda_1.map(normalize, result.rows);
    }
    async getAllTablesFromSchema(schema) {
        const result = await this.client.query(`SELECT table_name AS "tableName"
                     FROM information_schema.tables
                     WHERE table_schema = '${schema}'
                        AND NOT EXISTS (
                            SELECT 1
                                FROM pg_inherits
                                JOIN pg_class AS c ON (inhrelid = c.oid)
                                JOIN pg_class as p ON (inhparent = p.oid)
                                JOIN pg_namespace pn ON pn.oid = p.relnamespace
                                JOIN pg_namespace cn ON cn.oid = c.relnamespace
                                WHERE p.relname = table_name
                                    AND pn.nspname = table_schema
                        )
                     ORDER BY table_name`);
        return result.rows.map(({ tableName }) => `${schema}.${tableName}`);
    }
    async insert(row, table) {
        const { keys, values } = this.formatRowToSQL(row);
        try {
            await this.client.query(`
                INSERT INTO ${table.name} (${keys})
                    VALUES (${values})`);
        }
        catch (error) {
            const message = [
                `\n\n[${table.name}] `,
                `Error inserting ${JSON.stringify(row)}\n`
            ];
            console.error(message.join(''));
            throw error;
        }
    }
    async update(row, primaryQuery, table) {
        const { keys, values } = this.formatRowToSQL(row);
        try {
            await this.client.query(`
                UPDATE ${table.name}
                    SET (${keys}) = (${values})
                    WHERE ${primaryQuery}`);
        }
        catch (error) {
            const message = [
                `\n\n[${table.name}] `,
                `Error updating ${JSON.stringify(row)}\n`
            ];
            console.error(message.join(''));
            throw error;
        }
    }
    async getPrimaryKeys(tableName) {
        const result = await this.client.query(`
            SELECT
                a.attname,
                format_type(a.atttypid, a.atttypmod) AS data_type
            FROM
                pg_index i
            JOIN pg_attribute a ON
                a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
            WHERE
                i.indrelid = '${tableName}'::regclass
                AND i.indisprimary
            ORDER BY
                a.attname
        `);
        return result.rows.map(row => row.attname);
    }
    async getKeysWithDefault(tableName) {
        const result = await this.client.query(`
            SELECT
                a.attname AS "key"
            FROM
                pg_attribute a
            WHERE
                a.attrelid = '${tableName}'::regclass AND a.atthasdef`);
        const keys = ramda_1.pluck('key', result.rows);
        return new Set(keys);
    }
    readJSON(filename) {
        const absolutePath = path_1.default.join(__dirname, '..', 'seeds', filename);
        const data = fs_1.default.readFileSync(absolutePath).toString();
        return JSON.parse(data);
    }
}
function bail(errorObject) {
    console.error(`--- ${errorObject.error || errorObject}\n`);
    console.dir(errorObject);
    process.exit(1);
}
// Entrypoint.
async function main() {
    const { argv } = yargs_1.default
        .boolean(['dry'])
        .boolean(['failOnUpdates'])
        .string(['filterOut'])
        .string(['timeShift']);
    const runner = new SeedRunner(argv);
    await runner.connect();
    switch (argv._[0]) {
        case 'apply':
            await runner.apply(`${(argv._[1] || 'default')}.json`, argv.timeShift);
            break;
        case 'export':
            await runner.toJSON(ramda_1.drop(1, argv._), argv.filterOut);
            break;
        case 'complement':
            if (!argv._[1] || !argv._[2]) {
                throw new Error('The complement operation should be between two seeds.');
            }
            const seed = `${argv._[1]}.json`;
            const complement = `${argv._[2]}.json`;
            await runner.complement(seed, complement);
            break;
        default:
            throw new Error(`Unknown action "${argv._[0]}"`);
    }
    if (process.env.TZ !== 'UTC' && argv._[0] !== 'apply') {
        const message = 'You are not using the UTC timezone, this may lead to bugs';
        console.error(`\n\u001b[33m### [ ${message} ] ###\u001b[0m`);
        console.error(`> Use 'export TZ=UTC' in your shell\n`);
    }
}
main().catch(bail);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NjcmlwdHMvc2VlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBRXZCLHVDQUE4QjtBQUM5Qiw0Q0FBbUI7QUFDbkIsaUNBaUJjO0FBQ2Qsa0RBQXlCO0FBQ3pCLHVDQUErQztBQUUvQyw0QkFBNEI7QUFFNUIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNyQyxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFBO0FBY3RDLE1BQU0sVUFBVTtJQTBCWixZQUFZLEtBQVk7UUF2QlAsY0FBUyxHQUFHO1lBQ3pCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxXQUFXO1lBQ3ZDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxVQUFVO1lBQzlDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxVQUFVO1lBQ3RDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxRQUFRO1lBQzVDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJO1NBQzNDLENBQUE7UUFXZ0IsaUJBQVksR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNwQyxJQUFJO1lBQ0osSUFBSTtZQUNKLElBQUksQ0FBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQTtRQXVWTSxXQUFNLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTs7WUFDNUIsY0FBUSxLQUFLLDBDQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xDLEtBQUssTUFBTTtvQkFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUMzQyxLQUFL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