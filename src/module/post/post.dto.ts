import z from "zod";
import { SYS_REACTION } from "../../common/enums";
import { Types } from "mongoose";

export interface CreatePostDTO {
    content?: string;
    attachments?: string[];
} 

export const createdPostSchema=z.object({
    content:z.string().optional(),  
    attachments:z.array(z.string()).optional()
}).refine((data)=>data.content || data.attachments , {
    message:"Post must have content or attachments",
    path:["content","attachments"]
})

export interface AddReactionDTO {
    reaction:SYS_REACTION;
    id:Types.ObjectId;
}
