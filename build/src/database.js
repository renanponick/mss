"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
const ramda_1 = require("ramda");
const typedi_1 = require("typedi");
const TypeORM = __importStar(require("typeorm"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
class AppNamingStrategy extends TypeORM.DefaultNamingStrategy {
    constructor() {
        super(...arguments);
        this.maxIndexNameLength = 63;
    }
    getTableName(tableOrName) {
        return tableOrName instanceof TypeORM.Table
            ? tableOrName.name
            : tableOrName;
    }
    joinColumns(columnNames, suffix = 'key') {
        return [...columnNames, suffix]
            .map(name => change_case_1.snakeCase(name, undefined))
            .join('_');
    }
    joinColumnName(relationName) {
        return relationName;
    }
    joinTableColumnName(tableName) {
        return tableName;
    }
    foreignKeyName(tableOrName, columnNames) {
        const columns = this.joinColumns(columnNames, 'fkey');
        return `${this.getTableName(tableOrName)}_${columns}`;
    }
    columnName(propertyName, customName, prefixes) {
        return [...prefixes, customName || propertyName]
            .map(name => change_case_1.snakeCase(name, undefined))
            .join('_');
    }
    primaryKeyName(tableOrName) {
        return `${this.getTableName(tableOrName)}_pkey`;
    }
    uniqueConstraintName(tableOrName, columnNames) {
        const tableName = this.getTableName(tableOrName);
        let columns = columnNames;
        let name = `${tableName}_${this.joinColumns(columns, 'idx')}`;
        while (name.length > this.maxIndexNameLength) {
            columns = ramda_1.dropLast(1, columns);
            name = `${tableName}_${this.joinColumns(columns, 'idx')}`;
        }
        return name;
    }
    indexName(tableOrName, columnNames) {
        const tableName = this.getTableName(tableOrName);
        let columns = columnNames;
        let name = `${tableName}_${this.joinColumns(columns, 'key')}`;
        while (name.length > this.maxIndexNameLength) {
            columns = ramda_1.dropLast(1, columns);
            name = `${tableName}_${this.joinColumns(columns, 'key')}`;
        }
        return name;
    }
}
const poolSize = 20;
const connectionTimeoutMillis = 30000;
TypeORM.useContainer(typedi_1.Container);
const { logs, postgres } = config_1.default;
exports.default = TypeORM.createConnection({
    entities: [
        `${__dirname}/models/*`
    ],
    namingStrategy: new AppNamingStrategy(),
    logging: logs.db ? 'all' : false,
    extra: {
        max: poolSize,
        connectionTimeoutMillis: postgres.connectionTimeoutMillis
            || connectionTimeoutMillis
    },
    type: 'postgres',
    url: postgres.url
})
    .then(connection => {
    const safeUrl = postgres.url.replace(/:.*@/, '@');
    logger_1.default.info(`Connected to ${safeUrl}`);
    return connection;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXVDO0FBQ3ZDLGlDQUFnQztBQUNoQyxtQ0FBa0M7QUFDbEMsaURBQWtDO0FBRWxDLHNEQUE2QjtBQUM3QixzREFBMEI7QUFFMUIsTUFBTSxpQkFBa0IsU0FBUSxPQUFPLENBQUMscUJBQXFCO0lBQTdEOztRQUVxQix1QkFBa0IsR0FBRyxFQUFFLENBQUE7SUF1RTVDLENBQUM7SUFyRVcsWUFBWSxDQUFDLFdBQW1DO1FBQ3BELE9BQU8sV0FBVyxZQUFZLE9BQU8sQ0FBQyxLQUFLO1lBQ3ZDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSTtZQUNsQixDQUFDLENBQUMsV0FBVyxDQUFBO0lBQ3JCLENBQUM7SUFFTyxXQUFXLENBQUMsV0FBcUIsRUFBRSxNQUFNLEdBQUcsS0FBSztRQUNyRCxPQUFPLENBQUMsR0FBRyxXQUFXLEVBQUUsTUFBTSxDQUFDO2FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLHVCQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNsQixDQUFDO0lBRUQsY0FBYyxDQUFDLFlBQW9CO1FBQy9CLE9BQU8sWUFBWSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxTQUFpQjtRQUNqQyxPQUFPLFNBQVMsQ0FBQTtJQUNwQixDQUFDO0lBRUQsY0FBYyxDQUFDLFdBQW1DLEVBQUUsV0FBcUI7UUFDckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFFckQsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxFQUFFLENBQUE7SUFDekQsQ0FBQztJQUVELFVBQVUs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