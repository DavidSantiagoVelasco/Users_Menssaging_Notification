"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messagesModel_1 = __importDefault(require("../models/messagesModel"));
class MessagesController {
    constructor() {
        this.sendMessage = (req, res) => {
            const { emailSender, emailRecipient, title, message } = req.body;
            if (!emailSender || !emailRecipient || !title || !message) {
                return res.status(400).send({
                    error: 'Missing data'
                });
            }
            if (typeof emailSender !== 'string' || typeof emailRecipient !== 'string' || typeof title !== 'string' || typeof message !== 'string') {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            if (emailSender.length <= 1 || emailRecipient.length <= 1 || title.length <= 1 || message.length <= 1) {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            this.model.sendMessage(emailSender, emailRecipient, title, message, (response) => {
                if (response.error) {
                    return res.status(401).json({ error: response.error });
                }
                res.status(200).send(response);
            });
        };
        this.model = new messagesModel_1.default();
    }
}
exports.default = MessagesController;
