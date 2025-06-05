import mongoose, { Schema, Document } from "mongoose";

interface Message extends Document {
    message: string;
    sender: "user" | "ai";
}

const messageSchema = new Schema<Message>({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    
},{ timestamps: true });

const MessageModel = mongoose.models.Message || mongoose.model("Message", messageSchema)

export default MessageModel