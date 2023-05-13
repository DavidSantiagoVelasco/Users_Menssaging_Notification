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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const jwt = require('jsonwebtoken');
class UserController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, surname, photo, position, tokenFCM } = req.body;
            let { number } = req.body;
            if (!email || !name || !password || !surname || !photo || !number || !position || !number || !tokenFCM) {
                return res.status(400).send({
                    error: 'Missing data'
                });
            }
            number = Number(number);
            if (typeof email !== 'string' || typeof name !== 'string' || typeof password !== 'string' || typeof surname !== 'string' || typeof photo !== 'string' || typeof position !== 'string' || Number.isNaN(number) || typeof tokenFCM !== 'string') {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            if (email.length <= 1 || name.length <= 1 || surname.length <= 1 || password.length <= 1 || photo.length <= 1 || position.length <= 1 || number < 1 || tokenFCM.length <= 1) {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            const passwordEncrypt = yield bcryptjs_1.default.hash(password, 8);
            this.userModel.register(email, passwordEncrypt, name, surname, photo, position, number, tokenFCM, (response) => {
                if (response.error) {
                    return res.status(409).json({ error: response.error });
                }
                let token = this.generateToken(response.id, email, name);
                res.json({ id: response.id, email: email, name: name, surname: surname, photo: photo, position: position, token: token, messagge: response.success });
            });
        });
        this.userModel = new usersModel_1.default();
    }
    generateToken(id, email, name) {
        const token = jwt.sign({ id: id, email: email, name: name }, process.env.TOKEN_KEY, { expiresIn: "7d" });
        return token;
    }
}
exports.default = UserController;
