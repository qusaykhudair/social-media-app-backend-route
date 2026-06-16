"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// signup
router.post("/signup", (0, validation_middleware_1.isValid)(auth_validation_1.signupSchema), async (req, res, next) => {
    // service 
    const createdUser = await auth_service_1.default.signup(req.body);
    // send response
    return res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Account created successfully",
        data: { createdUser }
    });
});
// verify account
router.post("/verify-account", async (req, res, next) => {
    // service 
    const verifiedUser = await auth_service_1.default.verifyAccount(req.body);
    // send response
    return res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Account verified successfully",
    });
});
router.post("/send-otp", async (req, res, next) => {
    // service 
    await auth_service_1.default.sendOTP(req.body);
    // send response
    return res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "OTP sent successfully",
    });
});
router.post("/forget-password", async (req, res, next) => {
    // service 
    await auth_service_1.default.forgetPassword(req.body);
    // send response
    return res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Done ! Your password has been reset successfully",
    });
});
exports.default = router;
