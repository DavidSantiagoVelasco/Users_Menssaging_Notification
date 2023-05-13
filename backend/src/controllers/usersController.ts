import { Request, response, Response } from "express";
import UserModel from "../models/usersModel";

class UserController {

    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }
    
}

export default UserController;