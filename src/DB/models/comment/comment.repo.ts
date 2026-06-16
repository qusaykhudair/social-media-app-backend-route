import { IComment } from "../../../common/interfaces/comment.interface";
import { AbstractRepository } from "../../abstract.repo";
import { Comment } from "./comment.model";

export class CommentRepo extends AbstractRepository<IComment> {

    constructor() {
        super(Comment);
    }




}

export const commentRepo = new CommentRepo();