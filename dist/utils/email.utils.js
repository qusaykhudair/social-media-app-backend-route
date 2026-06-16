"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dev_config_1 = require("../config/dev.config");
const sendEmail = async ({ to, subject, html }) => {
    // Creating a more robust transporter for Gmail
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: dev_config_1.USER_EMAIL,
            pass: dev_config_1.USER_PASS // Your App Password
        },
        tls: {
            rejectUnauthorized: false // Helps in some cloud environments
        }
    });
    const mailOptions = {
        from: `"Saraha App" <${dev_config_1.USER_EMAIL}>`,
        to,
        subject,
        html,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);
        return info;
    }
    catch (error) {
        console.error("❌ Nodemailer Error:");
        // Throw the error so the user sees it in the Frontend Toast
        throw new Error(`Email failed`);
    }
};
exports.sendEmail = sendEmail;
