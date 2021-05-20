
import { groupBy, pluck } from 'ramda'
import { Connection } from 'typeorm'

import connectionPromise from '../src/database'

function bail(error: Error) {
    console.error(error.message)
    process.exit(1)
}

class CheckRunner {

    private connection: Connection
    private readonly errors: Array<{ message: string, queries: string[] }> = []

    async initialize(connectionPromise: Promise<Connection>) {
        this.connection = await connectionPromise

        return this
    }

    private readonly getTableName = (query: string) => {
        const regexpResult = /ALTER TABLE ([^ ]*)/.exec(query)

        if (!regexpResult) {
            return 'database'
        }

        return regexpResult[1].replace(/"/g, '')
    }

    async checkModelDifferences() {
        console.log('Checking model inconsistencies...')
        const queries = []

        const sql = await this.connection.driver.createSchemaBuilder().log()

        const diff = groupBy(this.getTableName, pluck('query', sql.upQueries))

        for (const name in diff) {
            for (const query of diff[name]) {
                queries.push(`${query}`)
            }
        }

        const count = sql.upQueries.length
        if (count > 0) {
            this.errors.push({
                message: `There are ${count} model inconsistencies`,
                queries
            })
        }
    }

    async checkDeferredConstraints(schema: string) {
        console.log(
            `Checking non-deferrable constraints for schema ${schema}...`
        )
        const queries = []

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
                AND tc.is_deferrable = 'NO'`

        const nonDeferrableIndexes = await this.connection.query(sql, [schema])
        for (const { name, table } of nonDeferrableIndexes) {
            queries.push(
                `ALTER TABLE ${schema}.${table} ALTER CONSTRAINT "${name}"`
                    + ' SET DEFERRABLE'
            )
        }
        const count = nonDeferrableIndexes.length
        if (count > 0) {
            this.errors.push({
                message: `There are ${count} non-deferrable foreign keys`,
                queries
            })
        }
    }

    async checkCascadeConstraints(
        schema: string,
        table: string
    ) {
        console.log(`Checking cascade constraints for ${schema}.${table}...`)

        const queries = []
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
                AND rc.delete_rule != 'CASCADE'`

        const nonCascadeConstraints = await this.connection
            .query(sql, [schema, table])

        for (const { name, table } of nonCascadeConstraints) {
            queries.push(
                `Add the CASCADE option on the "${name}" constraint of the `
                    + `${schema}.${table} model `
            )
        }

        const count = nonCascadeConstraints.length
        if (count > 0) {
            this.errors.push({
                message: `There are ${count} non-cascade foreign keys`,
                queries
            })
        }
    }

    async close() {
        await this.connection.close()
    }

    reportErrors() {
        for (const error of this.errors) {
            console.log(`\n\n - ${error.message}:\n`)
            for (const query of error.queries) {
                console.log(`  ${query}`)
            }
        }

        if (this.errors.length > 0) {
            throw new Error('There are database inconsistencies.')
        }
    }

}

async function run() {
    if (connectionPromise) {
        const connection = connectionPromise as Promise<Connection>
        const runner = await new CheckRunner().initialize(connection)

        await runner.checkModelDifferences()

        await runner.checkDeferredConstraints('public')

        await runner.close()

        runner.reportErrors()
    }
}

run().catch(bail)
