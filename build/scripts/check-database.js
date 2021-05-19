"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const database_1 = __importDefault(require("../src/database"));
function bail(error) {
    console.error(error.message);
    process.exit(1);
}
class CheckRunner {
    constructor() {
        this.errors = [];
        this.getTableName = (query) => {
            const regexpResult = /ALTER TABLE ([^ ]*)/.exec(query);
            if (!regexpResult) {
                return 'database';
            }
            return regexpResult[1].replace(/"/g, '');
        };
    }
    async initialize(connectionPromise) {
        this.connection = await connectionPromise;
        return this;
    }
    async checkModelDifferences() {
        console.log('Checking model inconsistencies...');
        const queries = [];
        const sql = await this.connection.driver.createSchemaBuilder().log();
        const diff = ramda_1.groupBy(this.getTableName, ramda_1.pluck('query', sql.upQueries));
        for (const name in diff) {
            for (const query of diff[name]) {
                queries.push(`${query}`);
            }
        }
        const count = sql.upQueries.length;
        if (count > 0) {
            this.errors.push({
                message: `There are ${count} model inconsistencies`,
                queries
            });
        }
    }
    async checkDeferredConstraints(schema) {
        console.log(`Checking non-deferrable constraints for schema ${schema}...`);
        const queries = [];
        const sql = `
            SELECT
                DISTINCT tc.constraint_name AS "name",
                tc.table_name AS "table"
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
            JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
            WHERE tc.constraint_type = 'FOREIGN KEY'
                AND tc.constraint_schema = $1
                AND tc.is_deferrable = 'NO'`;
        const nonDeferrableIndexes = await this.connection.query(sql, [schema]);
        for (const { name, table } of nonDeferrableIndexes) {
            queries.push(`ALTER TABLE ${schema}.${table} ALTER CONSTRAINT "${name}"`
                + ' SET DEFERRABLE');
        }
        const count = nonDeferrableIndexes.length;
        if (count > 0) {
            this.errors.push({
                message: `There are ${count} non-deferrable foreign keys`,
                queries
            });
        }
    }
    async checkCascadeConstraints(schema, table) {
        console.log(`Checking cascade constraints for ${schema}.${table}...`);
        const queries = [];
        const sql = `
            SELECT
                rc.constraint_name AS "name",
                tc.table_name AS "table"
            FROM information_schema.referential_constraints rc
            JOIN information_schema.constraint_table_usage ctu
                ON ctu.constraint_name = rc.constraint_name
            JOIN information_schema.table_constraints tc
                ON ctu.constraint_name = tc.constraint_name
            WHERE
                ctu.table_schema = $1
                AND ctu.table_name = $2
                AND rc.delete_rule != 'CASCADE'`;
        const nonCascadeConstraints = await this.connection
            .query(sql, [schema, table]);
        for (const { name, table } of nonCascadeConstraints) {
            queries.push(`Add the CASCADE option on the "${name}" constraint of the `
                + `${schema}.${table} model `);
        }
        const count = nonCascadeConstraints.length;
        if (count > 0) {
            this.errors.push({
                message: `There are ${count} non-cascade foreign keys`,
                queries
            });
        }
    }
    async close() {
        await this.connection.close();
    }
    reportErrors() {
        for (const error of this.errors) {
            console.log(`\n\n - ${error.message}:\n`);
            for (const query of error.queries) {
                console.log(`  ${query}`);
            }
        }
        if (this.errors.length > 0) {
            throw new Error('There are database inconsistencies.');
        }
    }
}
async function run() {
    const runner = await new CheckRunner().initialize(database_1.default);
    await runner.checkModelDifferences();
    await runner.checkDeferredConstraints('public');
    await runner.close();
    runner.reportErrors();
}
run().catch(bail);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zY3JpcHRzL2NoZWNrLWRhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsaUNBQXNDO0FBR3RDLCtEQUErQztBQUUvQyxTQUFTLElBQUksQ0FBQyxLQUFZO0lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbkIsQ0FBQztBQUVELE1BQU0sV0FBVztJQUFqQjtRQUdxQixXQUFNLEdBQWtELEVBQUUsQ0FBQTtRQVExRCxpQkFBWSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDOUMsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBRXRELElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsT0FBTyxVQUFVLENBQUE7YUFDcEI7WUFFRCxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzVDLENBQUMsQ0FBQTtJQXFITCxDQUFDO0lBbklHLEtBQUssQ0FBQyxVQUFVLENBQUMsaUJBQXNDO1FBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQTtRQUV6QyxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFZRCxLQUFLLENBQUMscUJBQXFCO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtRQUNoRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBRXBFLE1BQU0sSUFBSSxHQUFHLGVBQU8sQ0FBQyxJ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