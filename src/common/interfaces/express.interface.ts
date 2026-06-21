import { IUser } from "./user.interface";

// re-open 
declare module 'express-serve-static-core' {
    export interface Request {
        user:IUser;
    }
}