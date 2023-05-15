import { Schema, model } from "mongoose";
import IMessageInformation from "../interfaces/IMessageInformation";

const MessageInformationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    recipientEmail: {
        type: String,
        required: true
    },
    recipientTokens: {
        type: [String],
        required: true
    },
    firebaseResults: {
        type: [Schema.Types.Mixed],
        required: true
    },
});

export default model<IMessageInformation>('messageInformation', MessageInformationSchema);