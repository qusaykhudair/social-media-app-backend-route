"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_repo_1 = require("../../DB/models/request/request.repo");
const erorr_utils_1 = require("../../utils/erorr.utils");
const user_friend_repo_1 = require("../../DB/models/user-friend/user-friend.repo");
class RequestService {
    userFriendRepo;
    requestRepo;
    constructor(userFriendRepo, requestRepo) {
        this.userFriendRepo = userFriendRepo;
        this.requestRepo = requestRepo;
    }
    async sendRequest(senderId, receiverId) {
        // check block users [ToDo]
        // check user friend or request before [ToDo]
        ///////////////////////////////////////////////////////
        // check sender sent request or receiver sent request before 
        const reqExist = await this.requestRepo.getOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });
        if (reqExist) {
            throw new erorr_utils_1.ConflictException("you already sent request to this user or user sent request to you ");
        }
        // check sender and receiver are same user 
        if (senderId.toString() === receiverId.toString()) {
            throw new erorr_utils_1.ConflictException("you can not send request to yourself");
        }
        // if no => create new request 
        // send notification [ToDo]
        const createdRequest = await this.requestRepo.create({
            sender: senderId,
            receiver: receiverId
        });
    }
    async acceptRequest(senderId, receiverId) {
        // check request exist with status pending and receiver is receiverId 
        const reqExist = await this.requestRepo.getOne({ _id: receiverId });
        if (!reqExist) {
            throw new erorr_utils_1.NotFoundException("request not found");
        }
        // if yes , check receiver accept request
        if (reqExist.receiver.toString() !== receiverId.toString()) {
            throw new erorr_utils_1.UnauthenticatedException("you are not receiver of this request");
        }
        // delete from requests table 
        await this.requestRepo.deleteOne({ _id: receiverId });
        // create user's friendship table 
        await this.userFriendRepo.create({
            userId: senderId,
            friend: reqExist.sender,
        });
    }
    async declineRequest(senderId, receiverId) {
        // check request exist 
        const requestExist = await this.requestRepo.getOne({ _id: receiverId });
        if (!requestExist) {
            throw new erorr_utils_1.NotFoundException("request not found");
        }
        // if yes check sender and receiver 
        if (requestExist.receiver.toString() !== receiverId.toString()) {
            throw new erorr_utils_1.UnauthenticatedException("you are not receiver of this request");
        }
        // delete request from requests table 
        await this.requestRepo.deleteOne({ _id: receiverId });
        // send notification [ToDo]
    }
    async declineRequest2(senderId, receiverId) {
        // 1 query to DB >> check exitence and sender or receiver
        const { deletedCount } = await this.requestRepo.deleteOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });
        if (deletedCount == 0) {
            throw new erorr_utils_1.NotFoundException("request not found");
        }
        // send notification [ToDo]
    }
    async removeRequest(senderId, receiverId) {
        if (senderId.toString() === receiverId.toString()) {
            throw new erorr_utils_1.ConflictException("you can not remove request from yourself");
        }
        // check userFriend exist
        const { deletedCount } = await this.userFriendRepo.deleteOne({
            $or: [{ userId: senderId, friend: receiverId }, { userId: receiverId, friend: senderId }]
        });
        if (deletedCount == 0) {
            throw new erorr_utils_1.NotFoundException("you are not friend with this user ");
        }
    }
}
exports.default = new RequestService(new user_friend_repo_1.UserFriendRepo(), new request_repo_1.RequestRepo());
