import { model, Schema } from "mongoose";
import { IComment } from "../../../common/interfaces/comment.interface";


const schema = new Schema<IComment>(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
        parentCommentID: {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        },
        content: String,
        attachments: String,
        mentions: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        reactionsCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

// delete all replies when comment is deleted 
schema.pre('deleteOne' , async function(){
 // find all replies
 let filter = this.getFilter(); 
 const replies = await this.find({parentCommentID:filter._id});
// if replies exist
if (replies.length > 0) {
    for (const reply of replies) {
      await this.deleteOne({_id:reply._id});
    }
}
})
export const Comment = model("Comment", schema);
