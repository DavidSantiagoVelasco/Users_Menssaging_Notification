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

    private generateToken(id: string, email: string, name: string) {
        const token = jwt.sign(
            { id: id, email: email, name: name },
            process.env.TOKEN_KEY,
            { expiresIn: "7d" }
        );
        return token;
    }

}

export default UserController;