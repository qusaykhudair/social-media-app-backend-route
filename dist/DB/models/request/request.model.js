"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = void 0;
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
exports.RequestModel = (0, mongoose_1.model)('Request', RequestSchema);
