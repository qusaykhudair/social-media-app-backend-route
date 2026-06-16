import mongoose from "mongoose";
import { DB_URL } from "../config/dev.config";

export async function dbConnection(){
    return await mongoose.connect(DB_URL).then(() => console.log("DB connected 100%")).catch((err) => console.log("db not connected"))

}