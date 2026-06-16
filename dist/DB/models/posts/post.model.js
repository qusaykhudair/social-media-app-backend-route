"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Post = (0, mongoose_1.model)('Post', postSchema);
