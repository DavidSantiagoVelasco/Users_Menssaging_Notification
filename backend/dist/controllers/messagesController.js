"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messagesModel_1 = __importDefault(require("../models/messagesModel"));
class MessagesController {
    constructor() {
        this.model = new messagesModel_1.default();
    }
}
exports.default = MessagesController;
