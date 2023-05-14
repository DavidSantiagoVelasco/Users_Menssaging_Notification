"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
class UsersRoute {
    constructor() {
        this.config = () => {
            this.router.post('', this.userController.getUsers);
            this.router.post('/register', this.userController.register);
            this.router.post('/login', this.userController.login);
            this.router.post('/isValidToken', this.userController.validateToken);
            this.router.post('/deleteTokenFCM', this.userController.deleteTokenFCM);
        };
        this.router = (0, express_1.Router)();
        this.userController = new usersController_1.default();
        this.config();
    }
}
exports.default = UsersRoute;
