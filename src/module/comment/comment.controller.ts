import { Router, Request, Response, NextFunction } from "express";
import { commentService } from "./comment.service";
import { Types } from "mongoose";
import { addReactionService } from "../../common/service/addReaction.service";
import { CommentRepo } from "../../DB/models/comment/comment.repo";

const router:Router = Router()

router.post('/add-reaction' , async (req:Request,res:Response,next:NextFunction) => {
addReactionService(req.body , new Types.ObjectId(req.user.userId as string),new CommentRepo())
res.status(201).json({
    message:"reaction added successfully",
    success:true,
})
})

// create comment & reply comment
router.post('/:postID{/:parentCommentID}' , async (req:Request,res:Response,next:NextFunction) => {
addReactionService(req.body , new Types.ObjectId(req.user.userId as string),new CommentRepo())
})

// get all comments & replies
router.get('/:postID{/:parentCommentID}' , async (req:Request,res:Response,next:NextFunction) => {
    const comments = await commentService.getComments(req.params)
    res.status(201).json({
        message:"comments fetched successfully",
        success:true,
        data:comments
    })
})

// delete comment
router.delete('/:commentID' , async (req:Request,res:Response,next:NextFunction) => {
    await commentService.delete(new Types.ObjectId(req.params.commentID as string),new Types.ObjectId(req.user.userId as string))
    res.status(201).json({
        message:"comment deleted successfully",
        success:true,
    })
})

export default router;