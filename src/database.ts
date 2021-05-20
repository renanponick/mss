import { Container } from 'typedi'
import * as TypeORM from 'typeorm'

import config from './config'
import log from './logger'

const poolSize = 200
const connectionTimeoutMillis = 300000

TypeORM.useContainer(Container)

const { logs, postgres } = config

export default
TypeORM.createConnection({
    entities: [
        `${__dirname}/models/*`
    ],
    logging: logs.db ? 'all' : false,
    ssl: true,
    synchronize: true,
    dropSchema: false,
    extra: {
        max: poolSize,
        connectionTimeoutMillis: postgres.connectionTimeoutMillis
            || connectionTimeoutMillis,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    type: 'postgres',
    url: process.env.DATABASE_URL })
    .then(connection => {
        const safeUrl = postgres.url.replace(/:.*@/, '@')
        log.info(`Connected to ${safeUrl}`)

        return connection
    })
    .catch(err => {
        log.error(err)
    })
