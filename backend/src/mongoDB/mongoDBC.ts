import mongoose from "mongoose";
import UserSchema from "./schemas/userSchema";
import dotenv from "dotenv";

class MongoDBC {

    private uri: string;
    public UserSchema: any;
    public OfferSchema: any;
    public FavoriteSchema: any;
    public BiometricLoginUserDataSchema: any;
    public RestaurantSchema: any;
    public InformationUsersNotification: any;

    constructor() {
        dotenv.config();
        this.uri = process.env.URI || "";
        this.UserSchema = UserSchema;
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