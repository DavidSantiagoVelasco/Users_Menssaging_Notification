import { Schema, model } from "mongoose";
import IInformationFCM from "../interfaces/IInformationFCM";

const InformationFCMSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    tokenFCM: {
        type: String,
        required: true,
        unique: true
    }
});

InformationFCMSchema.index({ tokenFCM: 1 });

export default model<IInformationFCM>('informationFCM', InformationFCMSchema);