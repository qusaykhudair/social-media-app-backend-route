import { IRequest } from "../../../common/interfaces/request.interface";
import { model, Schema, Types } from "mongoose";

const RequestSchema = new Schema<IRequest>({
    sender: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export const RequestModel = model('Request', RequestSchema)