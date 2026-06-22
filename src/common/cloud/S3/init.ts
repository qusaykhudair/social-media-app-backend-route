import { BUCKET_REGION, BUCKET_ACCESS_KEY_ID, BUCKET_SECRET_ACCESS_KEY } from "../../../config/dev.config";
import { S3CloudProvider } from "./s3.service";
export const s3CloudProvider = new S3CloudProvider({
    region : BUCKET_REGION,
    credentials: {
        accessKeyId: BUCKET_ACCESS_KEY_ID,
        secretAccessKey:BUCKET_SECRET_ACCESS_KEY 
    }
})