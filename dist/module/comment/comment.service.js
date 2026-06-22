"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const comment_repo_1 = require("../../DB/models/comment/comment.repo");
const post_repo_1 = require("../../DB/models/posts/post.repo");
const erorr_utils_1 = require("../../common/utils/erorr.utils");
class CommentService {
    postRepo;
    commentRepo;
    constructor(postRepo, commentRepo) {
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
    }
    // create comment & reply comment
    async create(createCommentDTO, params, userID) {
        // postID check existence 
        if (params.postID) {
            const postExists = await this.postRepo.getOne({ _id: params.postID });
            if (!postExists)
                throw new erorr_utils_1.NotFoundException("post does not exist");
        }
        // if parentID == reply check parentID
        let parentCommentExists = undefined;
        if (params.parentCommentID) {
            parentCommentExists = await this.commentRepo.getOne({ _id: params.parentCommentID });
            if (!parentCommentExists)
                throw new erorr_utils_1.NotFoundException("comment does not exist");
        }
        // create comment 
        return await this.commentRepo.create({
            ...createCommentDTO,
            ...params,
            userID,
            postId: params.postID || parentCommentExists?.postId,
        });
    }
    async getComments(params) {
        const comments = await this.commentRepo.getAll({ postID: params.postID, parentCommentID: params.parentCommentID });
        if (comments.length === 0)
            throw new erorr_utils_1.NotFoundException("comment does not exist");
        return comments;
    }
    async getComment(commentID) {
        return await this.commentRepo.getOne({ _id: commentID });
    }
    // delete comment 
    async delete(commentID, userID) {
        const commentExists = await this.commentRepo.getOne({ _id: commentID }, {}, { populate: { path: "postId" } });
        if (!commentExists)
            throw new erorr_utils_1.NotFoundException("comment does not exist");
        let commentAuthor = commentExists?.userID.toString();
        let postAuthor = (commentExists?.postId)[0]?.userId.toString();
        if (!(userID.toString() != commentAuthor || userID.toString() != postAuthor))
            throw new erorr_utils_1.UnauthenticatedException("you are not authorized");
        await this.commentRepo.deleteOne(commentID);
    }
}
exports.commentService = new CommentService(new post_repo_1.PostRepo(), new comment_repo_1.CommentRepo());
