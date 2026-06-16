"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const post_model_1 = require("./post.model");
class PostRepo extends abstract_repo_1.AbstractRepository {
    constructor() {
        super(post_model_1.Post);
    }
}
exports.PostRepo = PostRepo;
