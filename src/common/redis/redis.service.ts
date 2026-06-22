import { createClient,RedisClientType } from "redis";
import { ICaheProvider } from "../cache/cache.interface";

interface RedisConfig {
    url: string,
}

export class RedisService implements ICaheProvider {
   private client: RedisClientType;

    constructor(config:RedisConfig){
        this.client = createClient(config)
   this.client.connect().catch((error)=>{
console.log(error)

   })
   
    }


    async getData(key: string): Promise<string | null> {
      return await this.client.get(key)
    }

    async setData(key: string, value: string, ttl?: number | undefined): Promise<void> {
    if(ttl){
       await this.client.set(key,value,{EX:ttl})
      } else { 
        await this.client.set(key,value)
      }
    }

    async deleteData(key: string): Promise<void> {
       await this.client.del(key)  
    }

}