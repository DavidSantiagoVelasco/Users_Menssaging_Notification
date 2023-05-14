import { Router } from "express";
import UserController from "../controllers/usersController";

class UsersRoute{

    public router: Router;
    private userController: UserController;

    constructor(){
        this.router = Router();
        this.userController = new UserController();
        this.config();
    }

    private config = () => {
        this.router.post('/register', this.userController.register);
        this.router.post('/login', this.userController.login);
        this.router.post('/isValidToken', this.userController.validateToken);
    }
}

export default UsersRoute;