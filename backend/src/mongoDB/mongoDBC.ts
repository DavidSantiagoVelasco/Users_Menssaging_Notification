import mongoose from "mongoose";
import UserSchema from "./schemas/userSchema";
import informationFCMSchema from "./schemas/informationFCMSchema";
import dotenv from "dotenv";

class MongoDBC {

    private uri: string;
    public UserSchema: any;
    public InformationFCMSchema: any;

    constructor() {
        dotenv.config();
        this.uri = process.env.URI || "";
        this.UserSchema = UserSchema;
        this.InformationFCMSchema = informationFCMSchema;
    }

    public connection(){
        if(this.uri === ""){
            console.log("Invalid URI");
            return;
        }
        mongoose.connect(this.uri)
            .then(() => {console.log('DB: Mongo connection');})
            .catch((err) => {console.log('Error connecting MongoDB: ', err)})
    }
}

export default MongoDBC;