"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFriendModel = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../../../common/enums");
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    friend: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    closeFriend: {
        type: Boolean,
        default: false
    },
    relastionship: {
        type: String,
        enum: enums_1.RELATIONSHIP_TYPE,
        default: null
    }
});
exports.userFriendModel = (0, mongoose_1.model)("UserFriend", schema);
