"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageInformationSchema = new mongoose_1.Schema({
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
        type: [mongoose_1.Schema.Types.Mixed],
        required: true
    },
});
exports.default = (0, mongoose_1.model)('messageInformation', MessageInformationSchema);
