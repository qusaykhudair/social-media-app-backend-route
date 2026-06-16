"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReactionRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const user_reaction_model_1 = require("./user-reaction.model");
class UserReactionRepo extends abstract_repo_1.AbstractRepository {
    constructor() {
        super(user_reaction_model_1.UserReaction);
    }
}
exports.UserReactionRepo = UserReactionRepo;
