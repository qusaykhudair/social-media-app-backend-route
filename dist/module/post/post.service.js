"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_repo_1 = require("../../DB/models/posts/post.repo");
class PostService {
    postRepo;
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    async create(createPostDTO, userId) {
        return await this.postRepo.create({ ...createPostDTO, userId });
    }
}
exports.PostService = PostService;
exports.default = new PostService(new post_repo_1.PostRepo());
