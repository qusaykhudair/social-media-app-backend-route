import z from "zod";

export const signupSchema = z.object({
 email : z.string({message : "Email is required"}).email({message : "Invalid Email"}),
 password : z.string().min(8,{message : "Password must be at least 8 characters"}).max(40,{message : "Password must be at most 40 characters"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message : "Invalid password"}),
 userName : z.string().min(3,{message : "Username must be at least 3 characters"}).max(30,{message : "Username must be at most 30 characters"}),
 phoneNumber : z.string().min(11,{message : "Phone number must be at least 11 digits"}).max(11,{message : "Phone number must be at most 11 digits"}).regex(/^(00201|01|\+201)[0125][0-9]{8}$/,{message : "Invalid phone number"}),
}); 