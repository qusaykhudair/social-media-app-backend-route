import { FirebaseService } from "./firebase.service";
import path from "path";
import fs from "fs";

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../config/socail-app-c1ef4-firebase-adminsdk-fbsvc-1a12a846d6.json")) as unknown as string);
export const firebaseService = new FirebaseService(config);