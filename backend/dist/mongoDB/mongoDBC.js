"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = __importDefault(require("./schemas/userSchema"));
const informationFCMSchema_1 = __importDefault(require("./schemas/informationFCMSchema"));
const dotenv_1 = __importDefault(require("dotenv"));
class MongoDBC {
    constructor() {
        dotenv_1.default.config();
        this.uri = process.env.URI || "";
        this.UserSchema = userSchema_1.default;
        this.InformationFCMSchema = informationFCMSchema_1.default;
    }
    connection() {
        if (this.uri === "") {
            console.log("Invalid URI");
            return;
        }
        mongoose_1.default.connect(this.uri)
            .then(() => { console.log('DB: Mongo connection'); })
            .catch((err) => { console.log('Error connecting MongoDB: ', err); });
    }
}
exports.default = MongoDBC;
