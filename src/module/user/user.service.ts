import { S3CloudProvider } from "../../common/cloud/S3/s3.service";


class UserService {
   constructor(private readonly s3CloudProvider:S3CloudProvider){

   }

   async uploadImage(file:Express.Multer.File,userId:string){
        const {url,key} = await this.s3CloudProvider.uploadFile(file,`users/${userId.toString()}/`)
        return {
          url,
          key
        }
   }   

   async deleteImage(key:string){
    const response = await this.s3CloudProvider.deleteFile(key)
    return response
   }

   async getImage(key:string){
    const response = await this.s3CloudProvider.getFile(key)
    return response
   }

}

export default new UserService(new S3CloudProvider({
    region:"ap-northeast-2",
    credentials:{
        accessKeyId:"AKIAYCQ7I7XQ7X7X7X7X",
        secretAccessKey:"AKIAYCQ7I7XQ7X7X7X7X"
    }
}))
