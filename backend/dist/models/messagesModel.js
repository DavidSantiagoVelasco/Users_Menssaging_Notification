"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const mongoDBC_1 = __importDefault(require("../mongoDB/mongoDBC"));
const messageInformationSchema_1 = __importDefault(require("../mongoDB/schemas/messageInformationSchema"));
class MessagesModel {
    constructor() {
        this.sendMessage = (emailSender, emailRecipient, title, message, fn) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.MongoDBC.connection();
                const userSenderExists = yield this.MongoDBC.UserSchema.findOne({
                    email: { $eq: emailSender }
                });
                const userRecipientExists = yield this.MongoDBC.UserSchema.findOne({
                    email: { $eq: emailRecipient }
                });
                if (userSenderExists === null || userRecipientExists === null) {
                    return fn({
                        error: 'Email do not exists'
                    });
                }
                const tokens = yield this.MongoDBC.InformationFCMSchema.find({ email: { $eq: emailRecipient } });
                const tokensArray = tokens.map((register) => register.tokenFCM);
                if (tokensArray.length == 0) {
                    return fn({
                        error: "User does not have registered FCM tokens"
                    });
                }
                const notificationPayload = {
                    notification: {
                        title: `You have a new message from ${emailSender}!`,
                        body: `Title: ${title}\nMessage: ${message}`
                    },
                    registration_ids: tokensArray,
                };
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `key=${process.env.FCM_API}`,
                };
                const response = yield axios_1.default.post('https://fcm.googleapis.com/fcm/send', notificationPayload, { headers });
                const messageInformation = new messageInformationSchema_1.default({
                    title: title,
                    body: message,
                    senderEmail: emailSender,
                    recipientEmail: emailRecipient,
                    recipientTokens: tokensArray,
                    firebaseResults: response.data,
                });
                yield messageInformation.save();
                return fn(response.data);
            }
            catch (error) {
                console.log(`Error in userModel login: ${error}`);
                return fn({
                    error: error
                });
            }
        });
        this.MongoDBC = new mongoDBC_1.default();
    }
}
exports.default = MessagesModel;
