import { Router , Request , Response , NextFunction } from "express";
import postService from "./post.service";
import { Types } from "mongoose";
import { isValid } from "../../middleware/validation.middleware";
import { createdPostSchema } from "./post.dto";
import { addReactionService } from "../../common/service/addReaction.service";
import { PostRepo } from "../../DB/models/posts/post.repo";
import commentRouter from "../comment/comment.controller";
const router = Router();

router.use("/postID/comment",commentRouter)

// create post 
router.post("/create",isValid(createdPostSchema),async(req:Request , res:Response , next:NextFunction)=>{
    const createdPost = await postService.create(req.body , new Types.ObjectId(req.user.userId as string))
    return res.status(201).json({
        message:"post created successfully",
        success:true,
        data:createdPost
    })
})  

router.post("/reaction",async(req:Request , res:Response , next:NextFunction)=>{
 addReactionService(req.body , new Types.ObjectId(req.user.userId as string),new PostRepo())
})  

export default router;