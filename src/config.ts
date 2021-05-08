import { mergeDeepRight } from 'ramda'

// Email config

type DisabledMailConfig = {
    kind: 'disabled'
    sender: string
}

type SMTPMailConfig = {
    kind: 'smtp'
    sender: string
    host: string
    port: number
}

type MailConfig =
    | DisabledMailConfig
    | SMTPMailConfig

// Full configuration
export type RedisCacheConfig = { kind: 'redis', host: string, port: number }

type CacheConfig =
    | RedisCacheConfig
    | { kind: 'in-memory' }
    | { kind: 'disabled' }

type Config = {
    secret: string
    port: number
    endpoint: string
    developmentResolver: boolean
    eventsEnabled: boolean
    jobsEnabled: boolean
    logs: {
        color: boolean
        level: 'crit' | 'error' | 'warning' | 'info' | 'debug'
        db: boolean
    }
    postgres: {
        url: string
        connectionTimeoutMillis: number
    }
    cache: CacheConfig
    mail: MailConfig
    amqpUrl: string
    testingDomain?: string
    disableRateLimit: boolean
    enableAsyncHandler: boolean
    remoteTimeout: number
}

function getLogLevel(level?: string) {
    switch (level) {
        case 'crit':
        case 'error':
        case 'warning':
        case 'info':
            return level
        default:
            return 'debug'
    }
}

const endpoint = process.env.APP_ENDPOINT
const logLevel = getLogLevel(process.env.LOG_LEVEL)
const defaultSenderEmail = process.env.EMAIL_DEFAULT_SENDER
    || 'contact@app.com'
const defaultSender = `App <${defaultSenderEmail}>`

function getMailConfig(): MailConfig {
    return {
        kind: 'smtp',
        sender: defaultSender,
        host: process.env.SMTP_HOST || 'localhost',
        port: Number(process.env.SMTP_PORT) || 1025 }
}

function getCacheConfig(): CacheConfig {
    const { REDIS_HOST, REDIS_PORT } = process.env
    if (REDIS_HOST) {
        return {
            kind: 'redis',
            host: REDIS_HOST,
            port: Number(REDIS_PORT) || 6379
        }
    }

    return { kind: 'in-memory' }
}

const defaultConfig: Config = {
    secret: 'h9wPkXXXtZ',
    port: Number(process.env.PORT) || 8080,
    endpoint: endpoint || 'http://localhost:8081',
    developmentResolver: true,
    eventsEnabled: true,
    jobsEnabled: true,
    testingDomain: process.env.IGNORE_EMAILS_TO,
    disableRateLimit: process.env.DISABLE_RATE_LIMIT === 'true',

    logs: {
        color: true,
        level: logLevel,
        db: logLevel === 'debug' && !process.env.OMIT_DB_LOGS
    },

    postgres: {
        url: process.env.DATABASE_URL
            || 'postgres://postgres:123456@localhost/postgres',
        connectionTimeoutMillis: 100000
    },

    mail: getMailConfig(),
    cache: getCacheConfig(),

    amqpUrl: process.env.AMQP_URL || 'amqp://localhost',

    enableAsyncHandler: true,

    remoteTimeout: parseInt(process.env.REMOTE_TIMEOUT || '60000', 10)
}

function overrideConfig(env: string) {
    switch (env) {
        case 'test':
            return {
                eventsEnabled: false,
                jobsEnabled: false,
                logs: { level: 'error', db: false },
                mail: { kind: 'disabled' },
                uploads: { kind: 'disabled' },
                cache: { kind: 'disabled' },
                enableAsyncHandler: false
            }
        case 'production':
            return {
                port: process.env.PORT || 80,
                endpoint,
                developmentResolver:
                process.env.ENABLE_DEVELOPMENT_RESOLVERS === 'true',
                logs: { color: false, db: false },
                exposeInviteToken: false
            }
        default:
            return {}
    }
}

const config = mergeDeepRight(
    defaultConfig,
    overrideConfig(process.env.NODE_ENV || 'development')
) as Config

// eslint-disable-next-line
console.log(`Using config: ${JSON.stringify(config)}`)

export default config
