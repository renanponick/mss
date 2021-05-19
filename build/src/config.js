"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
function getLogLevel(level) {
    switch (level) {
        case 'crit':
        case 'error':
        case 'warning':
        case 'info':
            return level;
        default:
            return 'debug';
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
-----END RSA PRIVATE KEY-----`;
const integrationKey = '0f02995d-79f2-4960-87f1-9ab1ea7cf40e';
// eslint-disable-next-line max-len
const scopeDocusign = 'extended signature organization_read group_read permission_read user_read user_write account_read domain_read identity_provider_read impersonation';
const userIdDocusign = 'e76cd356-109c-40d1-9c4b-3d0845497093';
const accountId = '3b130f7c-62c6-4d06-8231-423899155a3d';
const endpoint = process.env.APP_ENDPOINT;
const logLevel = getLogLevel(process.env.LOG_LEVEL);
const defaultSenderEmail = process.env.EMAIL_DEFAULT_SENDER
    || 'contact@app.com';
const defaultSender = `App <${defaultSenderEmail}>`;
function getMailConfig() {
    return {
        kind: 'smtp',
        sender: defaultSender,
        host: process.env.SMTP_HOST || 'localhost',
        port: Number(process.env.SMTP_PORT) || 1025
    };
}
function getCacheConfig() {
    const { REDIS_HOST, REDIS_PORT } = process.env;
    if (REDIS_HOST) {
        return {
            kind: 'redis',
            host: REDIS_HOST,
            port: Number(REDIS_PORT) || 6379
        };
    }
    return { kind: 'in-memory' };
}
const defaultConfig = {
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
        url: process.env.DATABASE_URL
            || 'postgres://postgres:123456@localhost/postgres',
        connectionTimeoutMillis: 100000
    },
    mail: getMailConfig(),
    cache: getCacheConfig(),
    amqpUrl: process.env.AMQP_URL || 'amqp://localhost',
    enableAsyncHandler: true,
    remoteTimeout: parseInt(process.env.REMOTE_TIMEOUT || '60000', 10)
};
function overrideConfig(env) {
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
            };
        case 'production':
            return {
                port: process.env.PORT || 80,
                endpoint,
                developmentResolver: process.env.ENABLE_DEVELOPMENT_RESOLVERS === 'true',
                logs: { color: false, db: false },
                exposeInviteToken: false
            };
        default:
            return {};
    }
}
const config = ramda_1.mergeDeepRight(defaultConfig, overrideConfig(process.env.NODE_ENV || 'development'));
// eslint-disable-next-line
console.log(`Using config: ${JSON.stringify(config)}`);
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFzQztBQTBEdEMsU0FBUyxXQUFXLENBQUMsS0FBYztJQUMvQixRQUFRLEtBQUssRUFBRTtRQUNYLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssTUFBTTtZQUNQLE9BQU8sS0FBSyxDQUFBO1FBQ2hCO1lBQ0ksT0FBTyxPQUFPLENBQUE7S0FDckI7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQTBCVyxDQUFBO0FBRTlCLE1BQU0sY0FBYyxHQUFHLHNDQUFzQyxDQUFBO0FBQzdELG1DQUFtQztBQUNuQyxNQUFNLGFBQWEsR0FBRyxvSkFBb0osQ0FBQTtBQUMxSyxNQUFNLGNBQWMsR0FBRyxzQ0FBc0MsQ0FBQTtBQUM3RCxNQUFNLFNBQVMsR0FBRyxzQ0FBc0MsQ0FBQTtBQUN4RCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQTtBQUN6QyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNuRCxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CO09BQ3BELGlCQUFpQixDQUFBO0FBQ3hCLE1BQU0sYUFBYSxHQUFHLFFBQVEsa0JBQWtCLEdBQUcsQ0FBQTtBQUVuRCxTQUFTLGFBQWE7SUFDbEIsT0FBTztRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLGFBQWE7UUFDckIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLFdBQVc7UUFDMUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNB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