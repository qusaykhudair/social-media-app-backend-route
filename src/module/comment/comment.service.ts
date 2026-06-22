import { Types } from "mongoose";
import { CreateCommentDTO } from "./comment.dto";
import { CommentRepo, commentRepo } from "../../DB/models/comment/comment.repo";
import { PostRepo } from "../../DB/models/posts/post.repo";
import { NotFoundException, UnauthenticatedException } from "../../common/utils/erorr.utils";
import { IPost } from "../../common/interfaces/post.interface";

class CommentService {
    constructor(private readonly postRepo: PostRepo, private readonly commentRepo: CommentRepo) { }


    // create comment & reply comment
    async create(createCommentDTO: CreateCommentDTO, params: any, userID: Types.ObjectId) {
        // postID check existence 
        if (params.postID) {
            const postExists = await this.postRepo.getOne({ _id: params.postID })
            if (!postExists) throw new NotFoundException("post does not exist")
        }
        // if parentID == reply check parentID

        let parentCommentExists: any = undefined;
        if (params.parentCommentID) {
            parentCommentExists = await this.commentRepo.getOne({ _id: params.parentCommentID })
            if (!parentCommentExists) throw new NotFoundException("comment does not exist")

        }
        // create comment 
        return await this.commentRepo.create({
            ...createCommentDTO,
            ...params,
            userID,
            postId: params.postID || parentCommentExists?.postId,
        })
    }

    async getComments(params: any) {
        const comments = await this.commentRepo.getAll({ postID: params.postID, parentCommentID: params.parentCommentID });
        if (comments.length === 0) throw new NotFoundException("comment does not exist")
        return comments

    }

    async getComment(commentID: Types.ObjectId) {
        return await this.commentRepo.getOne({ _id: commentID });
    }

    // delete comment 
    async delete(commentID: Types.ObjectId, userID: Types.ObjectId) {
        const commentExists = await this.commentRepo.getOne({ _id: commentID }, {}, { populate: { path: "postId" } })
        if (!commentExists) throw new NotFoundException("comment does not exist")
        let commentAuthor = commentExists?.userID.toString();
        let postAuthor = (commentExists?.postId as IPost[])[0]?.userId.toString();
        if (!(userID.toString() != commentAuthor || userID.toString() != postAuthor)) throw new UnauthenticatedException("you are not authorized")
        await this.commentRepo.deleteOne(commentID);
    }
}

export const commentService = new CommentService(new PostRepo(), new CommentRepo())