import { BUCKET_NAME } from "../../../config/dev.config";
import { ICloudProvider } from "../cloud.interface";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


interface S3Config {
 region : string,
 credentials: {
    accessKeyId:string,
    secretAccessKey:string
 },
}

export class S3CloudProvider implements ICloudProvider {  
   private client: S3Client
    constructor(config:S3Config){
        this.client=new S3Client({
            region : config.region ,
            credentials:{
                accessKeyId:config.credentials.accessKeyId,
                secretAccessKey:config.credentials.secretAccessKey
            }
        })
    }
    async uploadFile(file: Express.Multer.File, path: string):Promise<string> {
// upload images to s3
        let command=new PutObjectCommand({
    Bucket:BUCKET_NAME,
    Key:`${path}/${file.originalname}`,
    ACL : "public-read",
    ContentType:file.mimetype,
    Body: file.buffer
})
      await this.client.send(command)
      return command.input.Key as string ;
    }

    async deleteFile(key: string): Promise<boolean | undefined> {
      let command=new DeleteObjectCommand({
        Bucket:BUCKET_NAME,
        Key:key
      })
    const {DeleteMarker} = await this.client.send(command)
   return DeleteMarker;
}

    async getFile(key: string): Promise<NodeJS.ReadableStream | undefined> {
        let command=new GetObjectCommand({
            Bucket:BUCKET_NAME,
            Key:key
        })
        let response=await this.client.send(command)
        return response.Body as NodeJS.ReadableStream
    }

}