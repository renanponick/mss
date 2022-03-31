import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiDatetime from 'chai-datetime'
import chaiSubset from 'chai-subset'
import { camelCase } from 'change-case'
import 'mocha-typescript/di/typedi'
import { fromPairs, toPairs } from 'ramda'
import 'reflect-metadata'
import { getConnection } from 'typeorm'
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver'
import {
    PostgresQueryRunner
} from 'typeorm/driver/postgres/PostgresQueryRunner'

import databaseConnection from '../../src/database'

chai.use(chaiAsPromised)
chai.use(chaiDatetime)
chai.use(chaiSubset)

export const expect = chai.expect

/**
 * This is useful to debug the resulting database state of a test when using the
 * `@only` decorator.
 *
 * Just use `ISOLATED_TESTS=false yarn test` and the test suite will persist the
 * changes.
 */
const isolatedTestsEnabled = (process.env.ISOLATED_TESTS || '')
    .toLowerCase() !== 'false'

let isConnectionPrepared = false

class TransactionlessQueryRunner extends PostgresQueryRunner {

    private queriesCount: number
    private readonly queries = new Map<string, number>()

    resetCounter() {
        this.queriesCount = 0
    }

    get counter() {
        return this.queriesCount
    }

    recordDuplicatedQueries() {
        this.queries.clear()
    }

    getDuplicatedQueries(tolerance = Infinity) {
        const duplicated: Array<{ count: number, query: string }> = []
        for (const [query, count] of this.queries.entries()) {
            if (count > tolerance) {
                duplicated.push({ count, query })
            }
        }

        return duplicated.sort((left, right) => right.count - left.count)
    }

    async commitTransaction()   { /* noop */ }
    async startTransaction()    { /* noop */ }
    async rollbackTransaction() { /* noop */ }
    async release()             { /* noop */ }

    async query(query: string, parameters?: any[]) {
        this.queriesCount++
        this.queries.set(query, (this.queries.get(query) || 0) + 1)

        return super.query(query, parameters)
    }

}

export default class BaseTest {

    private static queryRunner: TransactionlessQueryRunner

    static async before() {
        if (isConnectionPrepared) {
            return
        }

        isConnectionPrepared = true
        await databaseConnection

        const connection = getConnection()
        const driver = connection.driver as PostgresDriver
        const queryRunner = new TransactionlessQueryRunner(driver)

        if (isolatedTestsEnabled) {
            // Manual transactions 😎😂
            connection.driver.createQueryRunner = () => queryRunner
            connection.query = queryRunner.query.bind(queryRunner)
        }
        BaseTest.queryRunner = queryRunner
    }

    async before() {
        if (isolatedTestsEnabled) {
            BaseTest.queryRunner.recordDuplicatedQueries()
            await getConnection().query('BEGIN TRANSACTION')
        }
    }

    async after() {
        if (isolatedTestsEnabled) {
            await getConnection().query('ROLLBACK')
            const tolerance = Number(process.env.QUERY_TOLERANCE)
            const duplicatedQueries = BaseTest.queryRunner
                .getDuplicatedQueries(tolerance)

            const duplicateCount = duplicatedQueries.length
            if (duplicateCount > 0) {
                const many = tolerance === 1
                    ? 'once'
                    : `${tolerance} times`

                console.error(`Queries that were called more than ${many}: `
                    + `${duplicateCount}`)
                console.dir(duplicatedQueries)
                process.exit(1)
            }
        }
    }

    private readonly camelCaseKeys =
        (obj: { [key: string]: any }): { [key: string]: any } => {
            const pairs: Array<[string, any]> = toPairs(obj)
                .map(([key, value]) => [camelCase(key), value])

            return fromPairs(pairs)
        }

    /**
     * Queries the database with a raw SQL statement.
     *
     * Automatically converts the result column names to the camelCase format.
     *
     * @param sql - The raw SQL string with templates as `$1`, `$2`...
     * @param parameters - Are values to be fit into the query.
     * @returns an array with the results.
     */
    async query(sql: string, ...parameters: any[]): Promise<any[]> {
        const result: any[] = await getConnection().query(sql, parameters)

        return result.map(this.camelCaseKeys)
    }

    async now() {
        const [{ now }] = await this.query('SELECT now()')

        return new Date(now)
    }

    protected async expectMaxQueries<T>(call: Promise<T>, maxQueries = 10) {
        BaseTest.queryRunner.resetCounter()

        const result = await call

        const count = BaseTest.queryRunner.counter
        if (count > maxQueries) {
            throw new Error('Too many queries! Expected a maximum of '
                + `${maxQueries}, but got ${count}.`)
        }

        return result
    }

}
