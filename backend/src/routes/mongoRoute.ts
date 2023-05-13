import { Router } from "express";
import UserController from "../controllers/usersController";

class MongoRoute{

    public router: Router;
    private userController: UserController;

    constructor(){
        this.router = Router();
        this.userController = new UserController();
        this.config();
    }

    private config = () => {
    }
}

export default MongoRoute;