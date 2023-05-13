"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = __importDefault(require("../models/usersModel"));
class UserController {
    constructor() {
        this.userModel = new usersModel_1.default();
    }
}
exports.default = UserController;
