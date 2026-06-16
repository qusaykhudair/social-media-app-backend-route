"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.radisConnect = radisConnect;
const redis_1 = require("redis");
const dev_config_1 = require("../config/dev.config");
exports.redisClient = (0, redis_1.createClient)({
    url: dev_config_1.REDIS_URL
});
function radisConnect() {
    exports.redisClient.connect().then(() => {
        console.log("Redis connected successfully");
    }).catch((err) => {
        console.log("Error in Redis connection ", err);
    });
}
