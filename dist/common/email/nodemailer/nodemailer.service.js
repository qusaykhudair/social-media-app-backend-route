"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailerProvider = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodeMailerProvider {
    transporter;
    constructor(config) {
        this.transporter = nodemailer_1.default.createTransport({
            service: config.service,
            auth: {
                user: config.auth.user,
                pass: config.auth.pass
            },
            host: config.host,
            port: config.port,
        });
    }
    async send(to, subject, html) {
        await this.transporter.sendMail({
            from: '"Mailtrap" <[EMAIL_ADDRESS]>',
            to,
            subject,
            html,
        });
    }
}
exports.NodeMailerProvider = NodeMailerProvider;
