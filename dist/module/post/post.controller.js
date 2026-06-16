"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_service_1 = __importDefault(require("./post.service"));
const mongoose_1 = require("mongoose");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const post_dto_1 = require("./post.dto");
const addReaction_service_1 = require("../../common/service/addReaction.service");
const post_repo_1 = require("../../DB/models/posts/post.repo");
const comment_controller_1 = __importDefault(require("../comment/comment.controller"));
const router = (0, express_1.Router)();
router.use("/postID/comment", comment_controller_1.default);
// create post 
router.post("/create", (0, validation_middleware_1.isValid)(post_dto_1.createdPostSchema), async (req, res, next) => {
    const createdPost = await post_service_1.default.create(req.body, new mongoose_1.Types.ObjectId(req.user.userId));
    return res.status(201).json({
        message: "post created successfully",
        success: true,
        data: createdPost
    });
});
router.post("/reaction", async (req, res, next) => {
    (0, addReaction_service_1.addReactionService)(req.body, new mongoose_1.Types.ObjectId(req.user.userId), new post_repo_1.PostRepo());
});
exports.default = router;
