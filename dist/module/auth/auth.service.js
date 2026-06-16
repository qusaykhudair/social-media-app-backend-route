"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_1 = require("../../DB/models/user/user.repo");
const redis_1 = require("../../DB/redis");
const bcrypt_utils_1 = require("../../utils/bcrypt.utils");
const crypto_utils_1 = require("../../utils/crypto.utils");
const email_utils_1 = require("../../utils/email.utils");
const erorr_utils_1 = require("../../utils/erorr.utils");
const oto_utils_1 = require("../../utils/oto.utils");
class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new user_repo_1.UserRepository();
    }
    async signup(signupDTO) {
        const { email } = signupDTO;
        // check user exist 
        const user = await this.userRepository.getOne({ email });
        if (user)
            throw new erorr_utils_1.ConflictException("User already exists");
        // hash password
        signupDTO.password = await (0, bcrypt_utils_1.hashPassword)(signupDTO.password);
        // encraption phone number
        if (signupDTO.phoneNumber) {
            signupDTO.phoneNumber = (0, crypto_utils_1.encryption)(signupDTO.phoneNumber);
        }
        // send OTP
        const otp = (0, oto_utils_1.generateOTP)();
        // send email
        await (0, email_utils_1.sendEmail)({ to: signupDTO.email, subject: "Confirm Email", html: `<h1> Your OTP is ${otp} </h1> <h2>This code is valid for 3 minutes </h2>` });
        // save OTP into radis ( three minutes)
        await redis_1.redisClient.set(`${signupDTO.email}:otp`, otp, { EX: 3 * 60 });
        // create user into radis ( three days)
        await redis_1.redisClient.set(signupDTO.email, JSON.stringify(signupDTO), { EX: 3 * 24 * 60 * 60 });
        // genarate token
    }
    async login(loginDTO) {
    }
    async forgetPassword(forgetPasswordDTO) {
        // check user exist 
        const user = await this.userRepository.getOne({ email: forgetPasswordDTO.email });
        if (!user)
            throw new erorr_utils_1.NotFoundException("User not found , verify your email");
        // get OTP from redis by email 
        const otpFromRedis = await redis_1.redisClient.get(`${forgetPasswordDTO.email}:otp`);
        if (!otpFromRedis)
            throw new erorr_utils_1.BadRequestException("expire time of OTP , send new OTP");
        // check OTP
        if (otpFromRedis !== forgetPasswordDTO.otp)
            throw new erorr_utils_1.BadRequestException("Invalid OTP , verify your email");
        // hash password
        const newPassword = await (0, bcrypt_utils_1.hashPassword)(forgetPasswordDTO.newPassword);
        // update password
        await this.userRepository.updateOne({ email: forgetPasswordDTO.email }, { password: forgetPasswordDTO.newPassword });
        // delete OTP from redis
        await redis_1.redisClient.del(`${forgetPasswordDTO.email}:otp`);
    }
    async verifyAccount(verifyAccount) {
        // get userdata from redis by email 
        const userdata = await redis_1.redisClient.get(verifyAccount.email);
        if (!userdata)
            throw new erorr_utils_1.NotFoundException("User not found , verify your email");
        // get OTP from redis by email 
        const otp = await redis_1.redisClient.get(`${verifyAccount.email}:otp`);
        if (!otp)
            throw new erorr_utils_1.BadRequestException("expire time of OTP , send new OTP");
        // check OTP
        if (otp !== verifyAccount.otp)
            throw new erorr_utils_1.BadRequestException("Invalid OTP , verify your email");
        // save user into DB and genarate token 
        const user = await this.userRepository.create(JSON.parse(userdata));
        // delete user from redis
        await redis_1.redisClient.del(verifyAccount.email);
        await redis_1.redisClient.del(`${verifyAccount.email}:otp`);
        return user;
    }
    async sendOTP(sendOtpDTO) {
        // check user exist 
        const userDB = await this.userRepository.getOne({ email: sendOtpDTO.email });
        const userRedis = await redis_1.redisClient.get(sendOtpDTO.email);
        if (!userRedis && !userDB)
            throw new erorr_utils_1.NotFoundException("User not found , verify your email");
        const otpExist = await redis_1.redisClient.get(`${sendOtpDTO.email}:otp`);
        if (otpExist)
            throw new erorr_utils_1.BadRequestException("Already sent an OTP , try again after 3 minutes");
        // generate otp 
        const otp = (0, oto_utils_1.generateOTP)();
        // send email
        await (0, email_utils_1.sendEmail)({ to: sendOtpDTO.email, subject: "Confirm Email", html: `<h1> Your OTP is ${otp} </h1> <h2>This code is valid for 3 minutes </h2>` });
        // save OTP into radis ( three minutes)
        await redis_1.redisClient.set(`${sendOtpDTO.email}:otp`, otp, { EX: 3 * 60 });
        // save user into redis ( three days)
        if (userRedis) {
            await redis_1.redisClient.set(sendOtpDTO.email, JSON.stringify(userRedis), { EX: 3 * 24 * 60 * 60 });
        }
    }
    async logout() {
    }
}
exports.default = new AuthService();
