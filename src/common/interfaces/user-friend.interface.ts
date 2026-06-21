import { Types } from "mongoose";
import { RELATIONSHIP_TYPE } from "../enums";

export interface IUserFriend{
    userId:Types.ObjectId
    friend:Types.ObjectId
    closeFriend:boolean 
    relastionship?:RELATIONSHIP_TYPE
}