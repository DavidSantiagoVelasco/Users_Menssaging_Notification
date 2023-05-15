import { Request, response, Response } from "express";
import MessagesModel from "../models/messagesModel";


class MessagesController {

    private model: MessagesModel;

    constructor() {
        this.model = new MessagesModel();
    }

    public sendMessage = (req: Request, res: Response) => {
        const { emailSender, emailRecipient, title, message } = req.body;
        if (!emailSender || !emailRecipient || !title || !message) {
            return res.status(400).send({
                error: 'Missing data'
            });
        }
        if (typeof emailSender !== 'string' || typeof emailRecipient !== 'string' || typeof title !== 'string' || typeof message !== 'string') {
            return res.status(400).send({
                error: 'Invalid data'
            });
        }
        if (emailSender.length <= 1 || emailRecipient.length <= 1 || title.length <= 1 || message.length <= 1) {
            return res.status(400).send({
                error: 'Invalid data'
            });
        }
        this.model.sendMessage(emailSender, emailRecipient, title, message, (response: any) => {
            if (response.error) {
                return res.status(401).json({ error: response.error });
            }
            res.status(200).send(response);
        });
    }
    
}

export default MessagesController;