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
        this.login = (req, res) => {
            const { email, password, tokenFCM } = req.body;
            if (!email || !password || !tokenFCM) {
                return res.status(400).send({
                    error: 'Missing data'
                });
            }
            if (typeof email !== 'string' || typeof password !== 'string' || typeof tokenFCM !== 'string') {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            if (email.length <= 1 || password.length <= 1 || tokenFCM.length <= 1) {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            this.userModel.login(email, password, tokenFCM, (response) => {
                if (response.error) {
                    return res.status(401).json({ error: response.error });
                }
                let token = this.generateToken(response.id, email, response.name);
                res.status(200).json({ id: response.id, name: response.name, email: email, photo: response.photo, surname: response.surname, position: response.position, number: response.number, token: token, messagge: response.success });
            });
        };
        this.getUsers = (req, res) => {
            const { email } = req.body;
            if (!email) {
                return res.status(400).send({
                    error: 'Missing data'
                });
            }
            if (typeof email !== 'string') {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            if (email.length <= 1) {
                return res.status(400).send({
                    error: 'Invalid data'
                });
            }
            this.userModel.getUsers(email, (response) => {
                if (response.error) {
                    return res.status(401).json({ error: response.error });
                }
                res.status(200).send(response);
            });
        };
        this.validateToken = (req, res) => {
            const token = req.body.token;
            if (token) {
                let decodedToken;
                try {
                    decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
                }
                catch (_a) {
                    return res.status(401).send({
                        error: 'Invalid token'
                    });
                }
                if (!decodedToken.id || !decodedToken.email || !decodedToken.name) {
                    return res.status(401).send({
                        error: 'Invalid token'
                    });
                }
                return res.status(200).send({ role: decodedToken.role, message: 'Token valid' });
            }
            return res.status(400).send({
                error: 'Missin data'
            });
        };
        this.userModel = new usersModel_1.default();
    }
    generateToken(id, email, name) {
        const token = jwt.sign({ id: id, email: email, name: name }, process.env.TOKEN_KEY, { expiresIn: "7d" });
        return token;
    }
}
exports.default = UserController;
