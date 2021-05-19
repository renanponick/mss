"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const bluebird_1 = require("bluebird");
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
class RedisCache {
    constructor(config) {
        this.config = config;
        this.client = new Proxy({}, {
            get() {
                throw new Error('The Redis client was called before initialisation.');
            }
        });
    }
    initialise() {
        logger_1.default.info('Using cache via Redis');
        this.client = redis_1.default.createClient(this.config);
    }
    close() {
        this.client.end(false);
    }
    set(keys, value, ttl) {
        return new Promise((resolve, reject) => {
            const handleError = error => {
                if (!error) {
                    return resolve();
                }
                return reject(error);
            };
            return ttl
                ? this.client.set(keys.join(':'), value, 'EX', ttl, handleError)
                : this.client.set(keys.join(':'), value, handleError);
        });
    }
    get(keys) {
        return new Promise((resolve, reject) => {
            this.client.get(keys.join(':'), (error, value) => {
                if (!error) {
                    return resolve(value);
                }
                return reject(error);
            });
        });
    }
    push(keys, value) {
        return new Promise((resolve, reject) => {
            this.client.rpush(keys.join(':'), value, error => {
                if (!error) {
                    return resolve();
                }
                return reject(error);
            });
        });
    }
    range(keys, start = 0, stop = -1) {
        return new Promise((resolve, reject) => {
            this.client.lrange(keys.join(':'), start, stop, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result || []);
            });
        });
    }
    iterScan(keySearch, cursor) {
        return new Promise((resolve, reject) => {
            this.client.scan(cursor, 'match', keySearch, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }
    async scan(keySearch) {
        let cursor = '0';
        let scanResults;
        const results = [];
        do {
            [cursor, scanResults] = await this.iterScan(keySearch, cursor);
            results.push(...scanResults);
        } while (cursor !== '0');
        return results;
    }
    async invalidate(keySearch) {
        const keys = await this.scan(keySearch);
        if (keys.length === 0) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.client.del(keys, error => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }
}
const disabledCache = {
    set: () => bluebird_1.resolve(),
    get: () => bluebird_1.resolve(undefined),
    invalidate: () => bluebird_1.resolve(),
    push: () => bluebird_1.resolve(),
    range: () => bluebird_1.resolve([]),
    initialise: () => { },
    close: () => { }
};
function create() {
    switch (config_1.default.cache.kind) {
        case 'redis':
            return new RedisCache(config_1.default.cache);
        default:
            return disabledCache;
    }
}
exports.create = create;
exports.default = create();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEM7QUFDMUMsdUNBQWtDO0FBRWxDLHNEQUFtRDtBQUNuRCxzREFBMEI7QUFhMUIsTUFBTSxVQUFVO0lBS1osWUFBWSxNQUF3QjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUN4QixHQUFHO2dCQUNDLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0RBQW9ELENBQ3ZELENBQUE7WUFDTCxDQUFDO1NBQ0osQ0FBZ0IsQ0FBQTtJQUNyQixDQUFDO0lBRUQsVUFBVTtRQUNOLGdCQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBYyxFQUFFLEtBQWEsRUFBRSxHQUFZO1FBQzNDLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsTUFBTSxXQUFXLEdBQXdCLEtBQUssQ0FBQyxFQUFFO2dCQUM3QyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLE9BQU8sT0FBTyxFQUFFLENBQUE7aUJBQ25CO2dCQUVELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3hCLENBQUMsQ0FBQTtZQUVELE9BQU8sR0FBRztnQkFDTixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUM7Z0JBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUM3RCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBYztRQUNkLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDeEI7Z0JBRUQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDeEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBYyxFQUFFLEtBQXdCO1FBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsT0FBTyxPQUFPLEVBQUUsQ0FBQTtpQkFDbkI7Z0JBRUQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDeEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBYyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDOUQsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ3ZCO2dCQUVELE9BQU8sT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLFFBQVEsQ0FBQyxTQUFpQixFQUFFLE1BQWM7UUFDOUMsT0FBTyxJQUFJLE9BQU8sQ0FBcUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNELElBQUksS0FBSyxFQUFFO29CQUNQLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUN2QjtnQkFFRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBaUI7UUFDaEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2hCLElBQUksV0FBcUIsQ0FBQTtRQUN6QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFbEIsR0FBRztZQUNDLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDOUQsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFBO1NBQy9CLFFBQVEsTUFBTSxLQUFLLEdBQUcsRUFBQztRQUV4QixPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFpQjtRQUM5QixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFNO1NBQ1Q7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ3ZCO2dCQUVELE9BQU8sT0FBTyxFQUFFLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSjtBQUVELE1BQU0sYUFBYSxHQUFHO0lBQ2xCLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxrQkFBTyxFQUFFO0lBQ3BCLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxrQkFBTyxDQUFDLFNBQVMsQ0FBQztJQUM3QixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsa0JBQU8sRUFBRTtJQUMzQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsa0JBQU8sRUFBRTtJQUNyQixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsa0JBQU8sQ0FBQyxFQUFFLENBQUM7SUFDeEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFjLENBQUM7SUFDaEMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFjLENBQUM7Q0FDOUIsQ0FBQTtBQUVELFNBQWdCLE1BQU07SUFDbEIsUUFBUSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDdkIsS0FBSyxPQUFPO1lBQ1IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZDO1lBQ0ksT0FBTyxhQUFhLENBQUE7S0FDM0I7QUFDTCxDQUFDO0FBUEQsd0JBT0M7QUFFRCxrQkFBZSxNQUFNLEVBQUUsQ0FBQSJ9