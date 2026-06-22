import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { USER_EMAIL, USER_PASS } from "../../config/dev.config";

export const sendEmail = async ({ to, subject, html }: MailOptions) => {
    // Creating a more robust transporter for Gmail
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: USER_EMAIL,
            pass: USER_PASS // Your App Password
        },
        tls: {
            rejectUnauthorized: false // Helps in some cloud environments
        }
    });

    const mailOptions = {
        from: `"Saraha App" <${USER_EMAIL}>`,
        to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error("❌ Nodemailer Error:");
        // Throw the error so the user sees it in the Frontend Toast
        throw new Error(`Email failed`);
    }
};