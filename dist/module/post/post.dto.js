"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdPostSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createdPostSchema = zod_1.default.object({
    content: zod_1.default.string().optional(),
    attachments: zod_1.default.array(zod_1.default.string()).optional()
}).refine((data) => data.content || data.attachments, {
    message: "Post must have content or attachments",
    path: ["content", "attachments"]
});
