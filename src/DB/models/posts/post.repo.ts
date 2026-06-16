import { AbstractRepository } from "../../abstract.repo"; 
import { IPost } from "../../../common/interfaces/post.interface";
import { Post } from "./post.model";

export class PostRepo extends AbstractRepository<IPost> {
    constructor() {
        super(Post);
    }
}