"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDBC_1 = __importDefault(require("../mongoDB/mongoDBC"));
class UserModel {
    constructor() {
        this.MongoDBC = new mongoDBC_1.default();
    }
}
exports.default = UserModel;
