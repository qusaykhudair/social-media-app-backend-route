"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFriendRepo = exports.UserFriendRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const user_friend_model_1 = require("./user-friend.model");
class UserFriendRepo extends abstract_repo_1.AbstractRepository {
    constructor() {
        super(user_friend_model_1.userFriendModel);
    }
}
exports.UserFriendRepo = UserFriendRepo;
exports.userFriendRepo = new UserFriendRepo();
