import { AbstractRepository } from "../../abstract.repo";
import { UserReaction } from "./user-reaction.model";
import { IUserReaction } from "../../../common/interfaces/user.reaction.interface";

export class UserReactionRepo extends AbstractRepository<IUserReaction> {
    constructor() {
        super(UserReaction);
    }
}
