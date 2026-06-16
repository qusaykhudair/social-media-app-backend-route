import { Types } from "mongoose";

export interface CreateCommentDTO {
    // send in params
    // postId: Types.ObjectId;
    // parentCommentID?: Types.ObjectId;

    // send in body
    content?: string;
    attachments?: string;
    mentions: Types.ObjectId[];
}
