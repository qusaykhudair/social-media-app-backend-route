import { AbstractRepository } from "../../abstract.repo";
import { IUser } from "../../../common/interfaces/user.interface";
import { User } from "./user.model";

export class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(User);
    }
}