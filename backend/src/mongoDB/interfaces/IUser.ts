import { Document } from "mongoose";

export default interface IUser extends Document {
    email: String,
    password: String,
    name: String,
    surname: String,
    photo: String,
    number: Number,
    position: String
}