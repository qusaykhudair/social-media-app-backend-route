import { createClient } from "redis"
import { REDIS_URL } from "../config/dev.config";

export const redisClient = createClient({
  url: REDIS_URL
});

export function radisConnect(){
  redisClient.connect().then(()=>{
    console.log("Redis connected successfully")
  }).catch((err:Error)=>{
console.log("Error in Redis connection ", err)
  })
    
}