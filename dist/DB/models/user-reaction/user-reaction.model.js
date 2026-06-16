"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReaction = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../../../common/enums");
const userReactionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    onModel: {
        type: String,
        enum: Object.values(enums_1.ON_MODEL),
        required: true,
    },
    reaction: {
        type: Number,
        enum: Object.values(enums_1.SYS_REACTION).filter(v => typeof v === "number"),
        default: enums_1.SYS_REACTION.like,
    },
    refId: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: "onModel",
        required: true,
    },
}, {
    timestamps: true,
});
exports.UserReaction = (0, mongoose_1.model)('UserReaction', userReactionSchema);
