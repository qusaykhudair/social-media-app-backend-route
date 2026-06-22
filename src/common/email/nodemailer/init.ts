import { USER_EMAIL, USER_PASS } from "../../../config/dev.config";
import { NodeMailerProvider } from "./nodemailer.service";

export const nodemailerProvider = new NodeMailerProvider({
    auth: {
        user: USER_EMAIL,
        pass: USER_PASS
    },
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587
})

