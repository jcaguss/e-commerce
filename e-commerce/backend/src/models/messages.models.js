import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date_message: {
        type: Date,
        default: Date.now
    }
})

export const messagesModel = model('messages', messageSchema)