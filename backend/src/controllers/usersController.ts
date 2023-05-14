import { Request, response, Response } from "express";
import bcryptjs from "bcryptjs";
import UserModel from "../models/usersModel";
const jwt = require('jsonwebtoken');


class UserController {

    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public register = async (req: Request, res: Response) => {
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
        const passwordEncrypt: string = await bcryptjs.hash(password, 8);
        this.userModel.register(email, passwordEncrypt, name, surname, photo, position, number, tokenFCM, (response: any) => {
            if (response.error) {
                return res.status(409).json({ error: response.error });
            }
            let token = this.generateToken(response.id, email, name);
            res.json({ id: response.id, email: email, name: name, surname: surname, photo: photo, position: position, token: token, messagge: response.success });
        });
    }

    public login = (req: Request, res: Response) => {
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
        this.userModel.login(email, password, tokenFCM, (response: any) => {
            if (response.error) {
                return res.status(401).json({ error: response.error });
            }
            let token = this.generateToken(response.id, email, response.name);
            res.status(200).json({ id: response.id, name: response.name, email: email, photo: response.photo, surname: response.surname, position: response.position, number: response.number, token: token, messagge: response.success });
        });
    }

    private generateToken(id: string, email: string, name: string) {
        const token = jwt.sign(
            { id: id, email: email, name: name },
            process.env.TOKEN_KEY,
            { expiresIn: "7d" }
        );
        return token;
    }

    public validateToken = (req: Request, res: Response) => {
        const token = req.body.token;
        if (token) {
            let decodedToken: any;
            try {
                decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            } catch {
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
    }
}

export default UserController;