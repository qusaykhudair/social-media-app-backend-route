"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_service_1 = __importDefault(require("./request.service"));
const mongoose_1 = require("mongoose");
const router = (0, express_1.Router)();
// send request
router.post("/:receiverId", async (req, res, next) => {
    await request_service_1.default.sendRequest(new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e68"), new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e67"));
    return res.status(204);
});
// accept request
router.post("/accept/:requestId", async (req, res, next) => {
    await request_service_1.default.acceptRequest(new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e68"), new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e67"));
    return res.status(204);
});
// decline request 
router.delete("/decline/:requestId", async (req, res, next) => {
    await request_service_1.default.declineRequest(new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e68"), new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e67"));
    return res.status(204);
});
// delete request or unfriend 
router.delete("/remove/:requestId", async (req, res, next) => {
    await request_service_1.default.removeRequest(new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e68"), new mongoose_1.Types.ObjectId("690d2e4ddddb56a870060e67"));
    return res.status(204);
});
exports.default = router;
