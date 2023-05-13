"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('users', UserSchema);
