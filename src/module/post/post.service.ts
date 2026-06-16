import { PostRepo } from "../../DB/models/posts/post.repo";
import { CreatePostDTO , AddReactionDTO } from "./post.dto";
import { Types } from "mongoose";
import { addReactionService } from "../../common/service/addReaction.service";

export class PostService {
 constructor(private readonly postRepo:PostRepo){}

 async create(createPostDTO:CreatePostDTO , userId:Types.ObjectId){
  return await this.postRepo.create({...createPostDTO , userId})
 }
 
}

export default new PostService(new PostRepo());