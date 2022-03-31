#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'

import { all } from 'bluebird'
import pg from 'pg'
import {
    drop,
    equals,
    head,
    keys,
    map,
    mapObjIndexed,
    pipe,
    pluck,
    props,
    reject,
    unnest,
    values,
    zip,
    zipObj,
    evolve,
    mergeAll
} from 'ramda'
import yargs from 'yargs'
import { addSeconds, parseISO } from 'date-fns'

// Global exception handlers

process.on('uncaughtException', bail)
process.on('unhandledRejection', bail)

type Flags = {
    dry?: boolean
    failOnUpdates?: boolean
}

type Row = Record<string, any>

type Seed = Array<{
    name: string
    rows: Row[]
}>

class SeedRunner {

    private readonly client: pg.Client
    private readonly dbOptions = {
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || 'postgres',
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || '123456',
        port: Number(process.env.PGPORT) || 5432
    }
    private readonly dryRun: boolean
    private readonly failOnUpdates: boolean
    private readonly colors: {
        blue: string
        yellow: string
        green: string
        reset: string
    }
    private readonly marker: string

    private readonly dateFieldIds = new Set([
        1114, // Timestamp
        1184, // Timestamptz
        1082  // Date
    ])

    constructor(flags: Flags) {
        this.dryRun = Boolean(flags.dry)
        this.failOnUpdates = Boolean(flags.failOnUpdates)
        this.client = new pg.Client(this.dbOptions)

        const hasColors = !process.env.OMIT_COLORS

        this.colors = hasColors
            ? { blue: '\u001b[34m',
                yellow: '\u001b[33m',
                green: '\u001b[32m',
                reset: '\u001b[0m' }
            : { blue: 'U',
                yellow: '.',
                green: 'I',
                reset: '' }

        this.marker = hasColors ? '#' : ''
    }

    public async connect() {
        await this.client.connect()
    }

    public async startTransaction() {
        await this.client.query('BEGIN TRANSACTION')
        await this.client.query('SET CONSTRAINTS ALL DEFERRED')
    }

    public async endTransaction() {
        await this.client.query(this.dryRun ? 'ROLLBACK' : 'COMMIT')
        await this.client.end()
    }

    private formatRowToSQL(row: { [key: string]: any }) {
        return {
            keys: keys(row).map(k => `"${k}"`).join(', '),
            values: values(row).map(this.escape).join(', ')
        }
    }

    public async apply(seedName: string, timeShift?: string) {
        await this.startTransaction()
        const interval = await this.secondsFromTimeShift(timeShift)

        const data = this.readJSON(seedName)
        for (const table of data) {
            console.log(
                `\n---- ${table.name}: ${table.rows.length} rows to insert`
            )

            const primaryKeys = await this.getPrimaryKeys(table.name)
            const defaultKeys = await this.getKeysWithDefault(table.name)
            const applyTimeShift = await this
                .getTimeShiftFn(table.name, interval)

            if (primaryKeys.length === 0) {
                throw new Error(`${table.name} has no primary keys!`)
            }

            for (const jsonRow of table.rows) {
                const row = applyTimeShift(jsonRow)

                const primaryQuery
                    = zip(primaryKeys, props(primaryKeys, row))
                        .map(([key, value]) => `"${key}" = '${value}'`)
                        .join(' AND ')

                const existingRow = head(await this.loadRows(
                    `SELECT * FROM ${table.name} WHERE ${primaryQuery}`,
                    defaultKeys
                ))

                let color = this.colors.green

                if (existingRow) {
                    if (equals(row, existingRow)) {
                        color = this.colors.yellow
                    } else {
                        color = this.colors.blue
                        if (this.failOnUpdates) {
                            this.reportMismatches(row, existingRow)
                            throw new Error('Seed mismatches found.')
                        }
                        await this.update(row, primaryQuery, table)
                    }
                } else {
                    await this.insert(row, table)
                }

                process.stdout
                    .write(`${color}${this.marker}${this.colors.reset}`)
            }
            console.log()
        }

        await this.endTransaction()
    }

    private reportMismatches(row: object, existingRow: object) {
        console.log('Seed:')
        console.dir(row)
        console.log('Database:')
        console.dir(existingRow)
    }

    public async toJSON(schemas: string[], tableFilter = '') {
        await this.startTransaction()

        const tableRegex = new RegExp(tableFilter)

        const tables = unnest(await all(schemas
            .sort()
            .map(async schema => this.getAllTablesFromSchema(schema))))
            .filter(name => tableRegex.test(name))

        let output = await all(tables.map(async name => {
            const keys = (await this.getPrimaryKeys(name))
                .map(key => `"${key}"`)
                .join(', ')
            const defaultKeys = await this.getKeysWithDefault(name)

            const rows = await this.loadRows(
                `SELECT * FROM ${name} ORDER BY ${keys}`,
                defaultKeys
            )

            return { name, rows }
        }))

        output = output.filter(({ rows }) => rows.length > 0)

        console.log(JSON.stringify(output, null, 4))

        await this.endTransaction()
    }

    private getIndex(primaryKeys: string[], row: Row) {
        const index = []
        for (const key of primaryKeys) {
            index.push(row[key])
        }

        return index.join(':')
    }

    private async createIndex(seed: Seed) {
        const index = new Set<string>()

        for (const table of seed) {
            const primaryKeys = await this.getPrimaryKeys(table.name)
            for (const row of table.rows) {
                index.add(`${table.name}:${this.getIndex(primaryKeys, row)}`)
            }
        }

        return index
    }

    private async remove(seed: Seed, index: Set<string>) {
        const newSeed: Seed = []

        for (const table of seed) {
            const rows: Row[] = []
            const primaryKeys = await this.getPrimaryKeys(table.name)
            for (const row of table.rows) {
                const key = `${table.name}:${this.getIndex(primaryKeys, row)}`

                if (!index.has(key)) {
                    rows.push(row)
                }
            }

            if (rows.length > 0) {
                newSeed.push({ name: table.name, rows })
            }
        }

        return newSeed
    }

    public async complement(seedName: string, complementName: string) {
        const complementData = this.readJSON(complementName)
        const complementIndex = await this.createIndex(complementData)
        const seed = this.readJSON(seedName)

        console.log(JSON.stringify(
            await this.remove(seed, complementIndex),
            null,
            4
        ))

        await this.client.end()
    }

    private async secondsFromTimeShift(timeShift?: string) {
        if (!timeShift) {
            return 0
        }

        const result = await this.client.query(
            `SELECT extract(epoch FROM interval '${timeShift}') "interval"`
        )

        return result.rows[0].interval as number
    }

    private async getTimeShiftFn(table: string, interval: number) {
        const result = await this.client.query(`SELECT * FROM ${table} LIMIT 0`)
        const fields = zip(pluck('name', result.fields), result.fields)
        const transformDate = (date: string) =>
            addSeconds(parseISO(date), interval).toJSON()
        const dateFieldsTransformer = fields
            .filter(([_, fieldDefinition]) =>
                this.dateFieldIds.has(fieldDefinition.dataTypeID))
            .map(field => ({ [field[0]]: transformDate }))

        return evolve(mergeAll(dateFieldsTransformer))
    }

    private async loadRows(query: string, keysWithDefault: Set<string>) {
        const result = await this.client.query(query)

        const fields = zipObj(pluck('name', result.fields), result.fields)

        const normalize = pipe(
            mapObjIndexed((value: any, key: string) => {
                const typeId = fields[key].dataTypeID
                if (value === null) {
                    return keysWithDefault.has(key)
                        ? null
                        : undefined
                }

                if (typeId === 1009) { // Text[]
                    return `{ ${value.join(', ')} }`
                }

                if (this.dateFieldIds.has(typeId)) {
                    return value.toJSON()
                }

                return value
            }),
            reject(value => value === undefined)
        )

        return map(normalize, result.rows)
    }

    private async getAllTablesFromSchema(schema: string) {
        const result: { rows: Array<{ tableName: string }> }
            = await this.client.query(
                `SELECT table_name AS "tableName"
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
                     ORDER BY table_name`
            )

        return result.rows.map(({ tableName }) => `${schema}.${tableName}`)
    }

    private async insert(row: any, table: any) {
        const { keys, values } = this.formatRowToSQL(row)
        try {
            await this.client.query(`
                INSERT INTO ${table.name} (${keys})
                    VALUES (${values})`)
        } catch (error) {
            const message = [
                `\n\n[${table.name}] `,
                `Error inserting ${JSON.stringify(row)}\n`
            ]
            console.error(message.join(''))
            throw error
        }
    }

    private async update(
        row: any,
        primaryQuery: string,
        table: any
    ) {
        const { keys, values } = this.formatRowToSQL(row)
        try {
            await this.client.query(`
                UPDATE ${table.name}
                    SET (${keys}) = (${values})
                    WHERE ${primaryQuery}`)
        } catch (error) {
            const message = [
                `\n\n[${table.name}] `,
                `Error updating ${JSON.stringify(row)}\n`
            ]
            console.error(message.join(''))
            throw error
        }
    }

    private async getPrimaryKeys(tableName: string) {
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
        `)

        return result.rows.map(row => row.attname) as string[]
    }

    private async getKeysWithDefault(tableName: string) {
        const result = await this.client.query(`
            SELECT
                a.attname AS "key"
            FROM
                pg_attribute a
            WHERE
                a.attrelid = '${tableName}'::regclass AND a.atthasdef`)
        const keys: string[] = pluck('key', result.rows)

        return new Set(keys)
    }

    private escape = (value: any) => {
        switch (value?.__proto__.constructor) {
            case String:
                return this.client.escapeLiteral(value)
            case Object:
            case Array:
                return `'${JSON.stringify(value)}'`
            default:
                return value ?? 'null'
        }
    }

    private readJSON(filename: string) {
        const absolutePath = path.join(__dirname, '..', 'seeds', filename)
        const data = fs.readFileSync(absolutePath).toString()

        return JSON.parse(data) as Seed
    }

}

function bail(errorObject: any) {
    console.error(`--- ${errorObject.error || errorObject}\n`)
    console.dir(errorObject)
    process.exit(1)
}

// Entrypoint.

async function main() {
    const { argv } = yargs
        .boolean(['dry'])
        .boolean(['failOnUpdates'])
        .string(['filterOut'])
        .string(['timeShift'])

    const runner = new SeedRunner(argv)
    await runner.connect()

    switch (argv._[0]) {
        case 'apply':
            await runner.apply(
                `${(argv._[1] || 'default')}.json`,
                argv.timeShift
            )
            break
        case 'export':
            await runner.toJSON(drop(1, argv._), argv.filterOut)
            break

        case 'complement':
            if (!argv._[1] || !argv._[2]) {
                throw new Error(
                    'The complement operation should be between two seeds.'
                )
            }
            const seed = `${argv._[1]}.json`
            const complement = `${argv._[2]}.json`
            await runner.complement(seed, complement)
            break
        default:
            throw new Error(`Unknown action "${argv._[0]}"`)
    }

    if (process.env.TZ !== 'UTC' && argv._[0] !== 'apply') {
        const message
            = 'You are not using the UTC timezone, this may lead to bugs'
        console.error(`\n\u001b[33m### [ ${message} ] ###\u001b[0m`)
        console.error(`> Use 'export TZ=UTC' in your shell\n`)
    }
}

main().catch(bail)
