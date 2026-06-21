import { model, Schema } from "mongoose";
import { IUserFriend } from "../../../common/interfaces/user-friend.interface";
import { RELATIONSHIP_TYPE } from "../../../common/enums";



const schema = new Schema<IUserFriend>({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    friend:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    closeFriend:{
        type:Boolean,
        default:false
    },
    relastionship:{
        type:String,
        enum:RELATIONSHIP_TYPE,
        default:null
    }
})

export const userFriendModel = model("UserFriend",schema)