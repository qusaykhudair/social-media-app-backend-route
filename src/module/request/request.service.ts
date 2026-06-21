import { Types } from "mongoose";
import { RequestRepo } from "../../DB/models/request/request.repo";
import { ConflictException, NotFoundException, UnauthenticatedException } from "../../utils/erorr.utils";
import { UserFriendRepo } from "../../DB/models/user-friend/user-friend.repo";

class RequestService {
 constructor(
    private readonly userFriendRepo:UserFriendRepo,
    private readonly requestRepo : RequestRepo){

 }  
 
 async sendRequest(senderId:Types.ObjectId,receiverId:Types.ObjectId){
   // check block users [ToDo]
   // check user friend or request before [ToDo]
 ///////////////////////////////////////////////////////
   // check sender sent request or receiver sent request before 
const reqExist=await this.requestRepo.getOne({
  $or:[
  {sender:senderId,receiver:receiverId},
  {sender:receiverId,receiver:senderId}
  ] 
})  

if(reqExist){
  throw new ConflictException("you already sent request to this user or user sent request to you ")
}
// check sender and receiver are same user 
if(senderId.toString()===receiverId.toString()){
  throw new ConflictException("you can not send request to yourself")
}

// if no => create new request 
// send notification [ToDo]
const createdRequest=await this.requestRepo.create({
  sender:senderId,
  receiver:receiverId
})

}

async acceptRequest(senderId:Types.ObjectId,receiverId:Types.ObjectId){
  // check request exist with status pending and receiver is receiverId 
const reqExist =  await this.requestRepo.getOne({_id:receiverId})
if(!reqExist){
  throw new NotFoundException("request not found")
}
// if yes , check receiver accept request
if(reqExist.receiver.toString()!==receiverId.toString()){
  throw new UnauthenticatedException("you are not receiver of this request")
}
// delete from requests table 
await this.requestRepo.deleteOne({_id:receiverId})
// create user's friendship table 
await this.userFriendRepo.create(
  {
    userId:senderId,
    friend:reqExist.sender,

  },
)
 }


 async declineRequest(senderId:Types.ObjectId,receiverId:Types.ObjectId){
    // check request exist 
    const requestExist =await this.requestRepo.getOne({_id:receiverId})
    if(!requestExist){
      throw new NotFoundException("request not found")
    }
    // if yes check sender and receiver 
    if(requestExist.receiver.toString()!==receiverId.toString()){
      throw new UnauthenticatedException("you are not receiver of this request")
    }
    // delete request from requests table 
    await this.requestRepo.deleteOne({_id:receiverId})
    // send notification [ToDo]
 }  
 async declineRequest2(senderId:Types.ObjectId,receiverId:Types.ObjectId){
// 1 query to DB >> check exitence and sender or receiver
const {deletedCount}=await this.requestRepo.deleteOne({
  $or:[
    {sender:senderId,receiver:receiverId},
    {sender:receiverId,receiver:senderId}
  ]
}) 

if(deletedCount==0){
  throw new NotFoundException("request not found")
}
// send notification [ToDo]

}


 async removeRequest(senderId:Types.ObjectId,receiverId:Types.ObjectId){
   if(senderId.toString()===receiverId.toString()){
    throw new ConflictException("you can not remove request from yourself")
   }
   
    // check userFriend exist
    const {deletedCount} = await this.userFriendRepo.deleteOne({
      $or:[{userId:senderId,friend:receiverId},{userId:receiverId,friend:senderId}]
    })

    if(deletedCount==0){
      throw new NotFoundException("you are not friend with this user ")
    }

 }
}


export default new RequestService(new UserFriendRepo(), new RequestRepo())
