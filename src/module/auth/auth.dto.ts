import z from "zod";
import { signupSchema } from "./auth.validation";

// the schema is the contract and the DTO is the type that we will use in the application 
// it is better to use the DTO instead of the schema
// because the DTO is the type that we will use in the application 
// and the schema is the contract that we will use in the application 
// it is the best way to use zod 

export type SignupDTO = z.infer<typeof signupSchema>

export interface LoginDto {
    email: string;
    password: string;
}

export interface ForgetPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface verifyAccountDTO{
    email: string;
    otp: string;
}

export interface sendOtpDTO{
    email: string;
}

export interface forgetPasswordDTO{
    otp: string;
    email: string;
    newPassword: string;
}