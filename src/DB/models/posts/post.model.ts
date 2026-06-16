import { Schema, model } from "mongoose";
import { IPost } from "../../../common/interfaces/post.interface";


const postSchema = new Schema<IPost>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
    },
    attachments: {
        type: [String],
    },
    reactionsCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    sharesCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export const Post = model('Post', postSchema);