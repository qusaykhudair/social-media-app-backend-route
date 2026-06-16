"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_service_1 = require("./comment.service");
const mongoose_1 = require("mongoose");
const addReaction_service_1 = require("../../common/service/addReaction.service");
const comment_repo_1 = require("../../DB/models/comment/comment.repo");
const router = (0, express_1.Router)();
router.post('/add-reaction', async (req, res, next) => {
    (0, addReaction_service_1.addReactionService)(req.body, new mongoose_1.Types.ObjectId(req.user.userId), new comment_repo_1.CommentRepo());
    res.status(201).json({
        message: "reaction added successfully",
        success: true,
    });
});
// create comment & reply comment
router.post('/:postID{/:parentCommentID}', async (req, res, next) => {
    (0, addReaction_service_1.addReactionService)(req.body, new mongoose_1.Types.ObjectId(req.user.userId), new comment_repo_1.CommentRepo());
});
// get all comments & replies
router.get('/:postID{/:parentCommentID}', async (req, res, next) => {
    const comments = await comment_service_1.commentService.getComments(req.params);
    res.status(201).json({
        message: "comments fetched successfully",
        success: true,
        data: comments
    });
});
// delete comment
router.delete('/:commentID', async (req, res, next) => {
    await comment_service_1.commentService.delete(new mongoose_1.Types.ObjectId(req.params.commentID), new mongoose_1.Types.ObjectId(req.user.userId));
    res.status(201).json({
        message: "comment deleted successfully",
        success: true,
    });
});
exports.default = router;
