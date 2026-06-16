"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = dbConnection;
const mongoose_1 = __importDefault(require("mongoose"));
const dev_config_1 = require("../config/dev.config");
async function dbConnection() {
    return await mongoose_1.default.connect(dev_config_1.DB_URL).then(() => console.log("DB connected 100%")).catch((err) => console.log("db not connected"));
}
