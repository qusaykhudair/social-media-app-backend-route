import { SYS_GENDER, SYS_PROVIDER, SYS_ROLE } from "../enums";

export interface IUser {
    userId:string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: SYS_ROLE,
    gender: SYS_GENDER,
    provider: SYS_PROVIDER,
    profilePic: string
}