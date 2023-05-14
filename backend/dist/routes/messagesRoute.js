"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagesController_1 = __importDefault(require("../controllers/messagesController"));
class MessagesRoute {
    constructor() {
        this.config = () => {
        };
        this.router = (0, express_1.Router)();
        this.controller = new messagesController_1.default();
        this.config();
    }
}
exports.default = MessagesRoute;
