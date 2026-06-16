import { Schema, model } from "mongoose";
import { IUserReaction } from "../../../common/interfaces/user.reaction.interface";
import { ON_MODEL, SYS_REACTION } from "../../../common/enums";

const userReactionSchema = new Schema<IUserReaction>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    onModel: {
        type: String,
        enum: Object.values(ON_MODEL),
        required: true, 
    },
    reaction: {
        type: Number,
        enum: Object.values(SYS_REACTION).filter(v => typeof v === "number"),
        default: SYS_REACTION.like,
    },
    refId: {
        type: Schema.Types.ObjectId,
        refPath: "onModel",
        required: true,
    },
}, {
    timestamps: true,
});

export const UserReaction = model('UserReaction', userReactionSchema);