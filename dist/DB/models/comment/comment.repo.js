"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepo = exports.CommentRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const comment_model_1 = require("./comment.model");
class CommentRepo extends abstract_repo_1.AbstractRepository {
    constructor() {
        super(comment_model_1.Comment);
    }
}
exports.CommentRepo = CommentRepo;
exports.commentRepo = new CommentRepo();
