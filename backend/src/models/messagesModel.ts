import MongoDBC from "../mongoDB/mongoDBC";
import axios from 'axios';

class MessagesModel {

    private MongoDBC: MongoDBC;

    constructor() {
        this.MongoDBC = new MongoDBC();
    }

    public sendMessage = async (emailSender: string, emailRecipient: string, title: string, message: string, fn: Function) => {
        try {
            this.MongoDBC.connection();
            const userSenderExists = await this.MongoDBC.UserSchema.findOne(
                {
                    email: { $eq: emailSender }
                }
            );
            const userRecipientExists = await this.MongoDBC.UserSchema.findOne(
                {
                    email: { $eq: emailRecipient }
                }
            );
            if (userSenderExists === null || userRecipientExists === null) {
                return fn({
                    error: 'Email do not exists'
                });
            }
            const tokens = await this.MongoDBC.InformationFCMSchema.find({ email: { $eq: emailRecipient } });
            const tokensArray = tokens.map((register: any) => register.tokenFCM);
            if (tokensArray.length == 0) {
                return;
            }
            const messageInformation = {
                notification: {
                    title: title,
                    body: message
                },
                registration_ids: tokensArray,
            };
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `key=${process.env.FCM_API}`,
            };

            const response = await axios.post(
                'https://fcm.googleapis.com/fcm/send',
                messageInformation,
                { headers }
            );

            return fn(response.data);
        } catch (error) {
            console.log(`Error in userModel login: ${error}`)
            return fn({
                error: error
            });
        }
    }

}

export default MessagesModel;