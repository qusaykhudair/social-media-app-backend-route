"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionService = void 0;
const erorr_utils_1 = require("../../utils/erorr.utils");
const enums_1 = require("../enums");
const user_reaction_repo_1 = require("../../DB/models/user-reaction/user-reaction.repo");
const post_repo_1 = require("../../DB/models/posts/post.repo");
function toModelName(collectionName) {
    switch (collectionName) {
        case "posts":
        case "Post":
            return enums_1.ON_MODEL.post;
        case "comments":
        case "Comment":
            return enums_1.ON_MODEL.comment;
        default:
            throw new erorr_utils_1.BadRequestException("Invalid collection name");
    }
}
const addReactionService = async (addReactionDTO, userId, repo) => {
    // check document exist
    const docExists = await repo.getOne({ _id: addReactionDTO.id });
    if (!docExists) {
        const itemType = repo instanceof post_repo_1.PostRepo ? "post" : "comment";
        throw new erorr_utils_1.BadRequestException(`${itemType} not found`);
    }
    const collectionName = docExists.collection.name;
    // check if user already reacted to post
    const userReactionRepo = new user_reaction_repo_1.UserReactionRepo();
    const userReaction = await userReactionRepo.getOne({ onModel: toModelName(collectionName), refId: addReactionDTO.id, userId });
    if (userReaction) {
        // if same reaction == remove reaction
        if (userReaction.reaction === addReactionDTO.reaction) {
            await userReactionRepo.deleteOne({ _id: userReaction._id });
            // update post reactions count
            await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactionsCount: -1 } });
            return;
        }
        else {
            // if different reaction == update reaction
            await userReactionRepo.updateOne({ _id: userReaction._id }, { $set: { reaction: addReactionDTO.reaction } });
            return;
        }
    }
    else {
        //if no reaction add reaction
        await userReactionRepo.create({ onModel: toModelName(collectionName), refId: addReactionDTO.id, userId, reaction: addReactionDTO.reaction });
        // update post reactions count
        await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactionsCount: 1 } });
        return;
    }
};
exports.addReactionService = addReactionService;
