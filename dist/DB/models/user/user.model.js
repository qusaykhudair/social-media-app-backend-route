"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("../../../common/enums/index");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 90
    },
    password: {
        type: String,
        required: function () {
            if (this.provider == index_1.SYS_PROVIDER.System) {
                return true;
            }
            else {
                return false;
            }
        },
        minlength: 3,
        maxlength: 90
    },
    role: {
        type: Number,
        enum: index_1.SYS_ROLE,
        default: index_1.SYS_ROLE.user
    },
    gender: {
        type: Number,
        enum: index_1.SYS_GENDER,
    },
    phoneNumber: {
        type: String,
    },
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)("User", userSchema);
