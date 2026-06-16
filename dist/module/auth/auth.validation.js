"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string({ message: "Email is required" }).email({ message: "Invalid Email" }),
    password: zod_1.default.string().min(8, { message: "Password must be at least 8 characters" }).max(40, { message: "Password must be at most 40 characters" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Invalid password" }),
    userName: zod_1.default.string().min(3, { message: "Username must be at least 3 characters" }).max(30, { message: "Username must be at most 30 characters" }),
    phoneNumber: zod_1.default.string().min(11, { message: "Phone number must be at least 11 digits" }).max(11, { message: "Phone number must be at most 11 digits" }).regex(/^(00201|01|\+201)[0125][0-9]{8}$/, { message: "Invalid phone number" }),
});
