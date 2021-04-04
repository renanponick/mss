import redis, { RedisClient } from 'redis'
import { resolve } from 'bluebird'

import config, { RedisCacheConfig } from './config'
import log from './logger'

interface Cache {
    set(keys: string[], value: string, ttl?: number): Promise<void>
    get(keys: string[]): Promise<string | undefined>
    invalidate(keySearch: string): Promise<void>
    push(keys: string[], value: string | string[]): Promise<void>
    range(keys: string[], start: number, stop: number): Promise<string[]>

    initialise(): void | Promise<void>
    close(): void | Promise<void>
}

class RedisCache implements Cache {

    private client: RedisClient
    private readonly config: RedisCacheConfig

    constructor(config: RedisCacheConfig) {
        this.config = config
        this.client = new Proxy({}, {
            get() {
                throw new Error(
                    'The Redis client was called before initialisation.'
                )
            }
        }) as RedisClient
    }

    initialise() {
        log.info('Using cache via Redis')
        this.client = redis.createClient(this.config)
    }

    close() {
        this.client.end(false)
    }

    set(keys: string[], value: string, ttl?: number) {
        return new Promise<void>((resolve, reject) => {
            const handleError: redis.Callback<any> = error => {
                if (!error) {
                    return resolve()
                }

                return reject(error)
            }

            return ttl
                ? this.client.set(keys.join(':'), value, 'EX', ttl, handleError)
                : this.client.set(keys.join(':'), value, handleError)
        })
    }

    get(keys: string[]) {
        return new Promise<string>((resolve, reject) => {
            this.client.get(keys.join(':'), (error, value) => {
                if (!error) {
                    return resolve(value)
                }

                return reject(error)
            })
        })
    }

    push(keys: string[], value: string | string[]) {
        return new Promise<void>((resolve, reject) => {
            this.client.rpush(keys.join(':'), value, error => {
                if (!error) {
                    return resolve()
                }

                return reject(error)
            })
        })
    }

    range(keys: string[], start = 0, stop = -1) {
        return new Promise<string[]>((resolve, reject) => {
            this.client.lrange(keys.join(':'), start, stop, (error, result) => {
                if (error) {
                    return reject(error)
                }

                return resolve(result || [])
            })
        })
    }

    private iterScan(keySearch: string, cursor: string) {
        return new Promise<[string, string[]]>((resolve, reject) => {
            this.client.scan(cursor, 'match', keySearch, (error, result) => {
                if (error) {
                    return reject(error)
                }

                return resolve(result)
            })
        })
    }

    private async scan(keySearch: string) {
        let cursor = '0'
        let scanResults: string[]
        const results = []

        do {
            [cursor, scanResults] = await this.iterScan(keySearch, cursor)
            results.push(...scanResults)
        } while (cursor !== '0')

        return results
    }

    async invalidate(keySearch: string) {
        const keys = await this.scan(keySearch)
        if (keys.length === 0) {
            return
        }

        return new Promise<void>((resolve, reject) => {
            this.client.del(keys, error => {
                if (error) {
                    return reject(error)
                }

                return resolve()
            })
        })
    }

}

const disabledCache = {
    set: () => resolve(),
    get: () => resolve(undefined),
    invalidate: () => resolve(),
    push: () => resolve(),
    range: () => resolve([]),
    initialise: () => { /* noop */ },
    close: () => { /* noop */ }
}

export function create(): Cache {
    switch (config.cache.kind) {
        case 'redis':
            return new RedisCache(config.cache)
        default:
            return disabledCache
    }
}

export default create()
