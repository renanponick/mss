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
    integrationKey: string
    privateKey: string
    scopeDocusign: string
    userIdDocusign: string
    accountId: string
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

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA5gdlqBdL1J40qb8y8UJLPUGG7C9NOvca/gYPgmt37tNMZa9E
85jVsmMO/YkBE1JMvJBBAVP6kPt5Dsf23OOJe/nVOUmAky/ELoYJo2wXASs+xNFq
pO1cMsJYo6o5aE0TgqOchS2PpjU+pkj6912uBNoIAgmLkpgOpWrMMXFMHXdohzr/
AaS57cAhAfJXzYJQGtLoiyT1rSRWi1yTQvLWp0kF0g2ys7aVQGHB6H5wJNdWljjs
75zwN8J3ORsOixPRZd7GntgHI2S3ktcHcUaW41C6ieV6NzxmBQr9xJC/Exbmb152
UCN/ca53NR2tIMv3bP5A5MLKiJkMI9mX1PPBEwIDAQABAoIBAGdezZ0TEv2yNsJN
bMwkWYFmkAZVX2RvJU8gVBnsx5GonL1ZXSgG94lZoKPozHXtVxSp0ryRC5nZmFY/
ID21dtQiumIrGL+MCKJLk8s/yLq6v1NdNIp3LCaXVZP+7Btl/62GbtEeX152sPey
9izxiUEe5dhch79R28sUSjyxyF24sEBKG4ctFkW/7TQuPfTLJgwdsVjhCDjKUE4v
XB7N54ANG5UhnpPJyqAbEDKRAn9nzd1ywuuz18pwNjhRKOsFEGPDSRgTrp/538dp
20ymb3+CnYF1V4BhTMrxon6RqmnBwpB7OsC14GpygTMMjQ++8bjKB5hplbGhnc03
MvXhLpkCgYEA9StxDJOzs9vfQqVvy1B42NQnP56hNrAFsHvlW3xbsZSAM0NEghJL
0cKDB82PyJZcZ3rvmBfzsFjl1aQcrlQ7UAxpxZjIEyLa7icNHG7+9ViapKlUDJ99
s6i3hPd67CE+WXWhMpiEUySc6XEDYDAmfOt47Kxr7+Y3IPzdXWlI5E8CgYEA8DC7
dVWohDcmUkGaZA9LYb4fsw3j4hcYvuYi33Eturjh4I8j+djzGbQu0O9G9cjbFA5J
LjEkjj9daYCxjxuzEnzu/pP1hannx6dr+0+7P1XlLkayS1+IaUFidCqSFzy894Zi
W3lg8Wp3i3mg3d/lZf6C1LdOwq9SojCQdU+ZMf0CgYEAwaF9t6Ev3G1a9xgSI1F7
IETueqCeUsLSu4AetRKSmL3gQpxuDwzENPaa5h7D4HhgopnFgSnpnO2ZGBJ1VHnS
HnavUxBHdFWi81SEVmCTnNJN0J6rcwzECpDF4I5U1wmqZJ0yovMyDzhrdTN8pwtg
WmjfKI1E8kOwZq1PZ+cvWqECgYEAi2lNtRoF2NAF3yKS0VcLQu1OiugaCAWt6Ee9
oAGaMFHVUTjkAcXJvHaX4c+wWUK+3hI4qaX+eM4QkwcOiGjkdGutcHhCvtVSYdEs
XM73eRiLEGQaYqNNkwJPeeunpfMsH2ORvVRjT1yjjIIJPB8TkDK8j2jiPx/yD4+u
mVidK6UCgYAtSCNiKBtb3F6hxV5IosHEGWKHRlGduPF2P5Huuent5dcU8jfLBsQ0
KLhgy8bvPbORHKuCLVZaf8BeKN2p0odbS56zmYEZkxnF5jPzv2Xd2K8g5c7MSQQa
oRNBmvPk436OUzfXfzz4hG88/Hl1ewwS/HT/31VOL4sXpksgz6vWLw==
-----END RSA PRIVATE KEY-----`

const integrationKey = '0f02995d-79f2-4960-87f1-9ab1ea7cf40e'
// eslint-disable-next-line max-len
const scopeDocusign = 'extended signature organization_read group_read permission_read user_read user_write account_read domain_read identity_provider_read impersonation'
const userIdDocusign = 'e76cd356-109c-40d1-9c4b-3d0845497093'
const accountId = '3b130f7c-62c6-4d06-8231-423899155a3d'
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
    integrationKey,
    privateKey,
    scopeDocusign,
    userIdDocusign,
    accountId,
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
        // eslint-disable-next-line max-len
        url: 'postgres://ypxhngsxutfbhk:d9431ca8d466f69cecd356c10b4bce02206950413811288f2c0dd1c3b512d0ec@ec2-54-166-167-192.compute-1.amazonaws.com:5432/d4v529nlf89k7l',
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
