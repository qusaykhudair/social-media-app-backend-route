import { it } from "node:test";
import { userRepository, UserRepository } from "../../DB/models/user/user.repo";
import { redisClient } from "../../DB/redis";
import { hashPassword } from "../../common/utils/bcrypt.utils";
import { encryption } from "../../common/utils/crypto.utils";
import { sendEmail } from "../../common/utils/email.utils";
import { BadRequestException, ConflictException, NotFoundException } from "../../common/utils/erorr.utils";
import { generateOTP } from "../../common/utils/oto.utils";
import { forgetPasswordDTO, ForgetPasswordDto, LoginDto, ResetPasswordDto, sendOtpDTO, SignupDTO, verifyAccountDTO } from "./auth.dto";
import { email } from "zod";
import { IMailProvider } from "../../common/email/mail.interface";
import { NodeMailerProvider } from "../../common/email/nodemailer/nodemailer.service";
import { nodemailerProvider } from "../../common/email/nodemailer/init";

class AuthService {

    private userRepository: UserRepository;
    private mailProvider: IMailProvider;

    constructor(userRepository: UserRepository, mailProvider: IMailProvider) {
        this.userRepository = userRepository;
        this.mailProvider = mailProvider;
    }
    async signup(signupDTO: SignupDTO) {
        const { email } = signupDTO
        // check user exist 
        const user = await this.userRepository.getOne({ email });
        if (user) throw new ConflictException("User already exists");
        // hash password
        signupDTO.password = await hashPassword(signupDTO.password);
        // encraption phone number
        if (signupDTO.phoneNumber) {
            signupDTO.phoneNumber = encryption(signupDTO.phoneNumber);
        }
        // send OTP
        const otp = generateOTP();
        // send email
        await this.mailProvider.send(signupDTO.email, "Confirm Email", "<h1> Your OTP is ${otp} </h1> <h2>This code is valid for 3 minutes </h2>");
        // save OTP into radis ( three minutes)
        await redisClient.set(`${signupDTO.email}:otp`, otp, { EX: 3 * 60 });

        // create user into radis ( three days)
        await redisClient.set(signupDTO.email, JSON.stringify(signupDTO), { EX: 3 * 24 * 60 * 60 });
        // genarate token

    }



    async login(loginDTO: LoginDto) {

    }

    async forgetPassword(forgetPasswordDTO: forgetPasswordDTO) {
        // check user exist 
        const user = await this.userRepository.getOne({ email: forgetPasswordDTO.email });
        if (!user) throw new NotFoundException("User not found , verify your email");
        // get OTP from redis by email 
        const otpFromRedis = await redisClient.get(`${forgetPasswordDTO.email}:otp`);
        if (!otpFromRedis) throw new BadRequestException("expire time of OTP , send new OTP");
        // check OTP
        if (otpFromRedis !== forgetPasswordDTO.otp) throw new BadRequestException("Invalid OTP , verify your email");
        // hash password
        const newPassword = await hashPassword(forgetPasswordDTO.newPassword);
        // update password
        await this.userRepository.updateOne({ email: forgetPasswordDTO.email }, { password: forgetPasswordDTO.newPassword });
        // delete OTP from redis
        await redisClient.del(`${forgetPasswordDTO.email}:otp`);
    }

    async verifyAccount(verifyAccount: verifyAccountDTO) {
        // get userdata from redis by email 
        const userdata = await redisClient.get(verifyAccount.email);
        if (!userdata) throw new NotFoundException("User not found , verify your email");
        // get OTP from redis by email 
        const otp = await redisClient.get(`${verifyAccount.email}:otp`);
        if (!otp) throw new BadRequestException("expire time of OTP , send new OTP");
        // check OTP
        if (otp !== verifyAccount.otp) throw new BadRequestException("Invalid OTP , verify your email");
        // save user into DB and genarate token 
        const user = await this.userRepository.create(JSON.parse(userdata));
        // delete user from redis
        await redisClient.del(verifyAccount.email);
        await redisClient.del(`${verifyAccount.email}:otp`);
        return user;
    }

    async sendOTP(sendOtpDTO: sendOtpDTO) {
        // check user exist 
        const userDB = await this.userRepository.getOne({ email: sendOtpDTO.email });
        const userRedis = await redisClient.get(sendOtpDTO.email);
        if (!userRedis && !userDB) throw new NotFoundException("User not found , verify your email");
        const otpExist = await redisClient.get(`${sendOtpDTO.email}:otp`);
        if (otpExist) throw new BadRequestException("Already sent an OTP , try again after 3 minutes");
        // generate otp 
        const otp = generateOTP();

        // send email
        await sendEmail({ to: sendOtpDTO.email, subject: "Confirm Email", html: `<h1> Your OTP is ${otp} </h1> <h2>This code is valid for 3 minutes </h2>` })

        // save OTP into radis ( three minutes)
        await redisClient.set(`${sendOtpDTO.email}:otp`, otp, { EX: 3 * 60 });
        // save user into redis ( three days)
        if (userRedis) {
            await redisClient.set(sendOtpDTO.email, JSON.stringify(userRedis), { EX: 3 * 24 * 60 * 60 });
        }
    }

    async logout() {

    }
}

export default new AuthService(userRepository, nodemailerProvider);
