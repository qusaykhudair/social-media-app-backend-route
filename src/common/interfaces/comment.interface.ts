import { Types } from "mongoose";
import { IPost } from "./post.interface";

export interface IComment {
    userID: Types.ObjectId;
    postId: Types.ObjectId | IPost[];
    parentCommentID?: Types.ObjectId;
    content?: string;
    attachments?: string;
    mentions: Types.ObjectId[];
    reactionsCount:number;

}