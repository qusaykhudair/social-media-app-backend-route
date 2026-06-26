"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
class FirebaseService {
    client;
    constructor(config) {
        this.client = (0, app_1.initializeApp)({
            credential: (0, app_1.cert)(config)
        });
    }
    async sendNotification(data, token) {
        await (0, messaging_1.getMessaging)(this.client).send({
            notification: {
                title: data.title,
                body: data.body
            },
            token: token
        });
    }
}
exports.FirebaseService = FirebaseService;
