"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InformationFCMSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('informationFCM', InformationFCMSchema);
