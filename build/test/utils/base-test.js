"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const chai_datetime_1 = __importDefault(require("chai-datetime"));
const chai_subset_1 = __importDefault(require("chai-subset"));
const change_case_1 = require("change-case");
require("mocha-typescript/di/typedi");
const ramda_1 = require("ramda");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const PostgresQueryRunner_1 = require("typeorm/driver/postgres/PostgresQueryRunner");
const database_1 = __importDefault(require("../../src/database"));
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(chai_datetime_1.default);
chai_1.default.use(chai_subset_1.default);
exports.expect = chai_1.default.expect;
/**
 * This is useful to debug the resulting database state of a test when using the
 * `@only` decorator.
 *
 * Just use `ISOLATED_TESTS=false yarn test` and the test suite will persist the
 * changes.
 */
const isolatedTestsEnabled = (process.env.ISOLATED_TESTS || '')
    .toLowerCase() !== 'false';
let isConnectionPrepared = false;
class TransactionlessQueryRunner extends PostgresQueryRunner_1.PostgresQueryRunner {
    constructor() {
        super(...arguments);
        this.queries = new Map();
    }
    resetCounter() {
        this.queriesCount = 0;
    }
    get counter() {
        return this.queriesCount;
    }
    recordDuplicatedQueries() {
        this.queries.clear();
    }
    getDuplicatedQueries(tolerance = Infinity) {
        const duplicated = [];
        for (const [query, count] of this.queries.entries()) {
            if (count > tolerance) {
                duplicated.push({ count, query });
            }
        }
        return duplicated.sort((left, right) => right.count - left.count);
    }
    async commitTransaction() { }
    async startTransaction() { }
    async rollbackTransaction() { }
    async release() { }
    async query(query, parameters) {
        this.queriesCount++;
        this.queries.set(query, (this.queries.get(query) || 0) + 1);
        return super.query(query, parameters);
    }
}
class BaseTest {
    constructor() {
        this.camelCaseKeys = (obj) => {
            const pairs = ramda_1.toPairs(obj)
                .map(([key, value]) => [change_case_1.camelCase(key), value]);
            return ramda_1.fromPairs(pairs);
        };
    }
    static async before() {
        if (isConnectionPrepared) {
            return;
        }
        isConnectionPrepared = true;
        await database_1.default;
        const connection = typeorm_1.getConnection();
        const driver = connection.driver;
        const queryRunner = new TransactionlessQueryRunner(driver);
        if (isolatedTestsEnabled) {
            // Manual transactions 😎😂
            connection.driver.createQueryRunner = () => queryRunner;
            connection.query = queryRunner.query.bind(queryRunner);
        }
        BaseTest.queryRunner = queryRunner;
    }
    async before() {
        if (isolatedTestsEnabled) {
            BaseTest.queryRunner.recordDuplicatedQueries();
            await typeorm_1.getConnection().query('BEGIN TRANSACTION');
        }
    }
    async after() {
        if (isolatedTestsEnabled) {
            await typeorm_1.getConnection().query('ROLLBACK');
            const tolerance = Number(process.env.QUERY_TOLERANCE);
            const duplicatedQueries = BaseTest.queryRunner
                .getDuplicatedQueries(tolerance);
            const duplicateCount = duplicatedQueries.length;
            if (duplicateCount > 0) {
                const many = tolerance === 1
                    ? 'once'
                    : `${tolerance} times`;
                console.error(`Queries that were called more than ${many}: `
                    + `${duplicateCount}`);
                console.dir(duplicatedQueries);
                process.exit(1);
            }
        }
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
    async query(sql, ...parameters) {
        const result = await typeorm_1.getConnection().query(sql, parameters);
        return result.map(this.camelCaseKeys);
    }
    async now() {
        const [{ now }] = await this.query('SELECT now()');
        return new Date(now);
    }
    async expectMaxQueries(call, maxQueries = 10) {
        BaseTest.queryRunner.resetCounter();
        const result = await call;
        const count = BaseTest.queryRunner.counter;
        if (count > maxQueries) {
            throw new Error('Too many queries! Expected a maximum of '
                + `${maxQueries}, but got ${count}.`);
        }
        return result;
    }
}
exports.default = BaseTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdC91dGlscy9iYXNlLXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsd0VBQTZDO0FBQzdDLGtFQUF3QztBQUN4Qyw4REFBb0M7QUFDcEMsNkNBQXVDO0FBQ3ZDLHNDQUFtQztBQUNuQyxpQ0FBMEM7QUFDMUMsNEJBQXlCO0FBQ3pCLHFDQUF1QztBQUV2QyxxRkFFb0Q7QUFFcEQsa0VBQW1EO0FBRW5ELGNBQUksQ0FBQyxHQUFHLENBQUMsMEJBQWMsQ0FBQyxDQUFBO0FBQ3hCLGNBQUksQ0FBQyxHQUFHLENBQUMsdUJBQVksQ0FBQyxDQUFBO0FBQ3RCLGNBQUksQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxDQUFBO0FBRVAsUUFBQSxNQUFNLEdBQUcsY0FBSSxDQUFDLE1BQU0sQ0FBQTtBQUVqQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO0tBQzFELFdBQVcsRUFBRSxLQUFLLE9BQU8sQ0FBQTtBQUU5QixJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQTtBQUVoQyxNQUFNLDBCQUEyQixTQUFRLHlDQUFtQjtJQUE1RDs7UUFHcUIsWUFBTyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFBO0lBcUN4RCxDQUFDO0lBbkNHLFlBQVk7UUFDUixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBQzVCLENBQUM7SUFFRCx1QkFBdUI7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsb0JBQW9CLENBQUMsU0FBUyxHQUFHLFFBQVE7UUFDckMsTUFBTSxVQUFVLEdBQTRDLEVB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