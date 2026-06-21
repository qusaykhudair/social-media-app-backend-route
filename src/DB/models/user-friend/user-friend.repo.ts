import { IUserFriend } from "../../../common/interfaces/user-friend.interface";
import { AbstractRepository } from "../../abstract.repo";
import { userFriendModel } from "./user-friend.model";

export class UserFriendRepo extends AbstractRepository<IUserFriend>{
    constructor(){
        super(userFriendModel)
    }
}

export const userFriendRepo = new UserFriendRepo()