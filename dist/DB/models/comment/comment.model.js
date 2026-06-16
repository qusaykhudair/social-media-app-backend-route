"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post"
    },
    parentCommentID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment"
    },
    content: String,
    attachments: String,
    mentions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    reactionsCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
// delete all replies when comment is deleted 
schema.pre('deleteOne', async function () {
    // find all replies
    let filter = this.getFilter();
    const replies = await this.find({ parentCommentID: filter._id });
    // if replies exist
    if (replies.length > 0) {
        for (const reply of replies) {
            await this.deleteOne({ _id: reply._id });
        }
    }
});
exports.Comment = (0, mongoose_1.model)("Comment", schema);
