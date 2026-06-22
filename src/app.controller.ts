import express, { Request, Response, NextFunction } from "express";
import { BadRequestException, NotFoundException } from "./common/utils/erorr.utils";
import { dbConnection } from "./DB/connection";
import { radisConnect } from "./DB/redis";
import authRouter from "./module/auth/auth.controller"
import postRouter from "./module/post/post.controller"
import commentRouter from "./module/comment/comment.controller"
import requestRouter from "./module/request/requset.controller"
import { s3CloudProvider } from "./common/cloud/S3/init";
import{pipeline} from "node:stream"
import { promisify } from "node:util";

const pipelinePromise= promisify(pipeline)
const app = express();

export async function bootstrap() {
 //   uploads router
    app.use('/uploads/*paths',async(req,res)=>{
   let key = (req.params.paths as string[]).join('/');
const fileReadStream = await s3CloudProvider.getFile(key)
  if(!fileReadStream){
throw new NotFoundException("file not found")
}

await pipelinePromise(fileReadStream,res)

}) 
 // DB Connection 
    dbConnection();
    radisConnect();
    app.use(express.json());

    // routes
    app.use("/auth", authRouter);
    app.use("/post", postRouter);
    app.use("/comment", commentRouter);
    app.use("/request", requestRouter);

    // erorr handeling 
    app.use((erorr: Error, req: Request, res: Response, next: NextFunction) => {
        return res.status(erorr.cause as number || 500).json({
            message: erorr.message,
            success: false,
            details: erorr instanceof BadRequestException ? erorr.details : undefined,

        })
    });
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

