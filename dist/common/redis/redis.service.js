"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const redis_1 = require("redis");
class RedisService {
    client;
    constructor(config) {
        this.client = (0, redis_1.createClient)(config);
        this.client.connect().catch((error) => {
            console.log(error);
        });
    }
    async getData(key) {
        return await this.client.get(key);
    }
    async setData(key, value, ttl) {
        if (ttl) {
            await this.client.set(key, value, { EX: ttl });
        }
        else {
            await this.client.set(key, value);
        }
    }
    async deleteData(key) {
        await this.client.del(key);
    }
}
exports.RedisService = RedisService;
