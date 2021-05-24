import { snakeCase } from 'change-case'
import { dropLast } from 'ramda'
import { Container } from 'typedi'
import * as TypeORM from 'typeorm'

import config from './config'
import log from './logger'

class AppNamingStrategy extends TypeORM.DefaultNamingStrategy {

    private readonly maxIndexNameLength = 63

    private getTableName(tableOrName: TypeORM.Table | string) {
        return tableOrName instanceof TypeORM.Table
            ? tableOrName.name
            : tableOrName
    }

    private joinColumns(columnNames: string[], suffix = 'key') {
        return [...columnNames, suffix]
            .map(name => snakeCase(name, undefined))
            .join('_')
    }

    joinColumnName(relationName: string) {
        return relationName
    }

    joinTableColumnName(tableName: string) {
        return tableName
    }

    foreignKeyName(tableOrName: TypeORM.Table | string, columnNames: string[]) {
        const columns = this.joinColumns(columnNames, 'fkey')

        return `${this.getTableName(tableOrName)}_${columns}`
    }

    columnName(
        propertyName: string,
        customName: string | undefined,
        prefixes: string[]
    ) {
        return [...prefixes, customName || propertyName]
            .map(name => snakeCase(name, undefined))
            .join('_')
    }

    primaryKeyName(tableOrName: TypeORM.Table | string) {
        return `${this.getTableName(tableOrName)}_pkey`
    }

    uniqueConstraintName(
        tableOrName: TypeORM.Table | string,
        columnNames: string[]
    ) {
        const tableName = this.getTableName(tableOrName)
        let columns = columnNames
        let name = `${tableName}_${this.joinColumns(columns, 'idx')}`

        while (name.length > this.maxIndexNameLength) {
            columns = dropLast(1, columns)
            name = `${tableName}_${this.joinColumns(columns, 'idx')}`
        }

        return name
    }

    indexName(tableOrName: TypeORM.Table | string, columnNames: string[]) {
        const tableName = this.getTableName(tableOrName)
        let columns = columnNames
        let name = `${tableName}_${this.joinColumns(columns, 'key')}`

        while (name.length > this.maxIndexNameLength) {
            columns = dropLast(1, columns)
            name = `${tableName}_${this.joinColumns(columns, 'key')}`
        }

        return name
    }

}

const poolSize = 20
const connectionTimeoutMillis = 30000

TypeORM.useContainer(Container)

const { logs, postgres } = config

export default
TypeORM.createConnection({
    entities: [
        `${__dirname}/models/*`
    ],
    namingStrategy: new AppNamingStrategy(),
    logging: logs.db ? 'all' : false,
    synchronize: true,
    dropSchema: false,
    extra: {
        max: poolSize,
        connectionTimeoutMillis: postgres.connectionTimeoutMillis
            || connectionTimeoutMillis/* ,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }*/
    },
    type: 'postgres',
    url: postgres.url })
    .then(connection => {
        const safeUrl = postgres.url.replace(/:.*@/, '@')
        log.info(`Connected to ${safeUrl}`)

        return connection
    })
