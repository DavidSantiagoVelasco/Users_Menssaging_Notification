import MongoDBC from "../mongoDB/mongoDBC";
import UserSchema from "../mongoDB/schemas/userSchema";

class UserModel {

    private MongoDBC: MongoDBC;

    constructor() {
        this.MongoDBC = new MongoDBC();
    }
}

export default UserModel;