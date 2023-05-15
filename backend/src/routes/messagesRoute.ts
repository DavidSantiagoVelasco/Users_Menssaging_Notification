import { Router } from "express";
import MessagesController from "../controllers/messagesController";

class MessagesRoute{

    public router: Router;
    private controller: MessagesController;

    constructor(){
        this.router = Router();
        this.controller = new MessagesController();
        this.config();
    }

    private config = () => {
        this.router.post('/send', this.controller.sendMessage);
    }
}

export default MessagesRoute;