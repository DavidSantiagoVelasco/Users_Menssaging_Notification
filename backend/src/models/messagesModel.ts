import MongoDBC from "../mongoDB/mongoDBC";

class MessagesModel {

    private MongoDBC: MongoDBC;

    constructor() {
        this.MongoDBC = new MongoDBC();
    }
    
}

export default MessagesModel;