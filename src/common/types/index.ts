import { HydratedDocument } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export type UserDocument = HydratedDocument<IUser>;

let user: UserDocument;