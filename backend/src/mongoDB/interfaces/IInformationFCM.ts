import { Document } from "mongoose";

export default interface IInformationFCM extends Document {
    email: String,
    tokenFCM: String
}