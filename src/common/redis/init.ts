import { RedisService } from "./redis.service";
import { REDIS_URL } from "../../config/dev.config";
export const redisCacheProvider=new RedisService({
    url:REDIS_URL
})