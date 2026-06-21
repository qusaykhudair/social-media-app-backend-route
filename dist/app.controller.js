"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const express_1 = __importDefault(require("express"));
const erorr_utils_1 = require("./utils/erorr.utils");
const connection_1 = require("./DB/connection");
const redis_1 = require("./DB/redis");
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const post_controller_1 = __importDefault(require("./module/post/post.controller"));
const comment_controller_1 = __importDefault(require("./module/comment/comment.controller"));
const requset_controller_1 = __importDefault(require("./module/request/requset.controller"));
const app = (0, express_1.default)();
async function bootstrap() {
    // DB Connection    
    (0, connection_1.dbConnection)();
    (0, redis_1.radisConnect)();
    app.use(express_1.default.json());
    // routes
    app.use("/auth", auth_controller_1.default);
    app.use("/post", post_controller_1.default);
    app.use("/comment", comment_controller_1.default);
    app.use("/request", requset_controller_1.default);
    // erorr handeling 
    app.use((erorr, req, res, next) => {
        return res.status(erorr.cause || 500).json({
            message: erorr.message,
            success: false,
            details: erorr instanceof erorr_utils_1.BadRequestException ? erorr.details : undefined,
        });
    });
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}
