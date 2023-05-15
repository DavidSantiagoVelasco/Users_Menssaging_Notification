import { Document } from "mongoose";

export default interface IMessageInformation extends Document {
    title: String;
    body: String;
    senderEmail: String;
    recipientEmail: String;
    recipientTokens: String[];
    firebaseResults: any[];
}