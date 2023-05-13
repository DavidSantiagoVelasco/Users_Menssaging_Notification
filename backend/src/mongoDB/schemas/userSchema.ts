import { Schema, model } from "mongoose";
import IUser from "../interfaces/IUser";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

export default model<IUser>('users', UserSchema);