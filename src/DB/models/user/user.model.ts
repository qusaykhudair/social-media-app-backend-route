import { model, Schema } from "mongoose";
import { SYS_GENDER, SYS_PROVIDER, SYS_ROLE } from "../../../common/enums/index";
import { IUser } from "../../../common/interfaces/user.interface";

const userSchema = new Schema<IUser>({
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
            if (this.provider == SYS_PROVIDER.System) {
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
        enum: SYS_ROLE,
        default: SYS_ROLE.user
    },

    gender: {
        type: Number,
        enum: SYS_GENDER,
    },

    phoneNumber: {
        type: String,
    },




}, {
    timestamps: true
})

export const User = model("User", userSchema);