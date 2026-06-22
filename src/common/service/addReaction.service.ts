import { Types } from "mongoose";
import { AddReactionDTO } from "../../module/post/post.dto";
import { BadRequestException } from "../utils/erorr.utils";
import { ON_MODEL } from "../enums";
import { UserReactionRepo } from "../../DB/models/user-reaction/user-reaction.repo";
import { PostRepo } from "../../DB/models/posts/post.repo";
import { CommentRepo } from "../../DB/models/comment/comment.repo";


function toModelName(collectionName: string) {
    switch (collectionName) {
        case "posts":
        case "Post":
            return ON_MODEL.post;
        case "comments":
        case "Comment":
            return ON_MODEL.comment;
        default:
            throw new BadRequestException("Invalid collection name");
    }
}
export const addReactionService = async (addReactionDTO: AddReactionDTO, userId: Types.ObjectId, repo: PostRepo | CommentRepo) => {
    // check document exist
    const docExists = await repo.getOne({ _id: addReactionDTO.id })
    if (!docExists) {
        const itemType = repo instanceof PostRepo ? "post" : "comment";
        throw new BadRequestException(`${itemType} not found`);
    }
    const collectionName = docExists.collection.name
    // check if user already reacted to post
    const userReactionRepo = new UserReactionRepo();
    const userReaction = await userReactionRepo.getOne({ onModel: toModelName(collectionName), refId: addReactionDTO.id, userId })

    if (userReaction) {
        // if same reaction == remove reaction
        if (userReaction.reaction === addReactionDTO.reaction) {
            await userReactionRepo.deleteOne({ _id: userReaction._id })
            // update post reactions count
            await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactionsCount: -1 } })
            return;
        } else {
            // if different reaction == update reaction
            await userReactionRepo.updateOne({ _id: userReaction._id }, { $set: { reaction: addReactionDTO.reaction } })
            return;
        }
    } else {
        //if no reaction add reaction
        await userReactionRepo.create({ onModel: toModelName(collectionName), refId: addReactionDTO.id, userId, reaction: addReactionDTO.reaction })
        // update post reactions count
        await repo.updateOne({ _id: addReactionDTO.id }, { $inc: { reactionsCount: 1 } })
        return;
    }
}  