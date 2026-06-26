import { NotificationProvider } from "../notification.interface";
import { App, initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

export class FirebaseService implements NotificationProvider {
   private client : App;
    constructor(config : any) {
        this.client = initializeApp({
            credential: cert(config)
        })
    }
    async sendNotification(data: { title: string; body: string }, token: string): Promise<void> {
        await getMessaging(this.client).send({
            notification: {
                title: data.title,
                body: data.body
            },
            token: token
        });
    }
}

