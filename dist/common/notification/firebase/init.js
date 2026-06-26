"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseService = void 0;
const firebase_service_1 = require("./firebase.service");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../config/socail-app-c1ef4-firebase-adminsdk-fbsvc-1a12a846d6.json")));
exports.firebaseService = new firebase_service_1.FirebaseService(config);
