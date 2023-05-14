import { Request, response, Response } from "express";
import MessagesModel from "../models/messagesModel";


class MessagesController {

    private model: MessagesModel;

    constructor() {
        this.model = new MessagesModel();
    }
    
}

export default MessagesController;