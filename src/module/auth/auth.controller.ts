import {type NextFunction, type Request, type Response, Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middleware/validation.middleware";
import { signupSchema } from "./auth.validation";

const router = Router();

// signup
router.post("/signup",isValid(signupSchema), async (req:Request, res:Response , next:NextFunction) => {
// service 
const createdUser = await authService.signup(req.body);
// send response
return res.status(201).json({
    status : "success",
    statusCode : 201,
    message : "Account created successfully",
    data : {createdUser}
})  

});

// verify account
router.post("/verify-account", async (req:Request, res:Response , next:NextFunction) => {
// service 
const verifiedUser = await authService.verifyAccount(req.body);
// send response
return res.status(200).json({
    status : "success",
    statusCode : 200,
    message : "Account verified successfully",
})  

});

router.post("/send-otp", async (req:Request, res:Response , next:NextFunction) => {
// service 
await authService.sendOTP(req.body);
// send response
return res.status(200).json({
    status : "success",
    statusCode : 200,
    message : "OTP sent successfully",
})  

});

router.post("/forget-password", async (req:Request, res:Response , next:NextFunction) => {
// service 
await authService.forgetPassword(req.body);
// send response
return res.status(200).json({
    status : "success",
    statusCode : 200,
    message : "Done ! Your password has been reset successfully",
})  

});
export default router;