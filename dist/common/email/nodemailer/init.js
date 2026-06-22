"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerProvider = void 0;
const dev_config_1 = require("../../../config/dev.config");
const nodemailer_service_1 = require("./nodemailer.service");
exports.nodemailerProvider = new nodemailer_service_1.NodeMailerProvider({
    auth: {
        user: dev_config_1.USER_EMAIL,
        pass: dev_config_1.USER_PASS
    },
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587
});
