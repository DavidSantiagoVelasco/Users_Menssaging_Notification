import bcryptjs from "bcryptjs";
import MongoDBC from "../mongoDB/mongoDBC";
import UserSchema from "../mongoDB/schemas/userSchema";
import InformationFCMSchema from "../mongoDB/schemas/informationFCMSchema";

class UserModel {

    private MongoDBC: MongoDBC;

    constructor() {
        this.MongoDBC = new MongoDBC();
    }

    public register = async (email: string, password: string, name: string, surname: string, photo: string, position: string, number: Number, tokenFCM: string, fn: Function) => {
        try {
            this.MongoDBC.connection();
            let userDetails = new UserSchema({
                email: email,
                password: password,
                name: name,
                surname: surname,
                photo: photo,
                position: position,
                number: number
            });
            const userExists = await this.MongoDBC.UserSchema.findOne(
                {
                    email: { $eq: email }
                }
            );
            if (userExists != null) {
                return fn({
                    error: 'Email already exists'
                });
            }
            const newUser = await userDetails.save();
            if (newUser._id) {
                await this.insertTokenFCM(email, tokenFCM);
                return fn({
                    success: 'Register success',
                    id: newUser._id
                })
            }
            return fn({
                error: 'Register error'
            });
        } catch (error) {
            console.log(`Error in userModel register: ${error}`)
            return fn({
                error: error
            });
        }
    }

    public login = async (email: string, password: string, tokenFCM: string, fn: Function) => {
        try {
            this.MongoDBC.connection();
            const userExists = await this.MongoDBC.UserSchema.findOne(
                {
                    email: { $eq: email }
                }
            );
            if (userExists == null) {
                return fn({
                    error: 'Email or password incorrect'
                });
            }
            let compare = bcryptjs.compareSync(password, userExists.password);
            if (!compare) {
                return fn({
                    error: 'Email or password incorrect'
                });
            }
            await this.insertTokenFCM(email, tokenFCM);
            return fn({
                success: 'Login success',
                id: userExists._id,
                email: email,
                name: userExists.name,
                surname: userExists.surname,
                photo: userExists.photo,
                position: userExists.position,
                number: userExists.number
            });
        } catch (error) {
            console.log(`Error in userModel login: ${error}`)
            return fn({
                error: error
            });
        }
    }

    public insertTokenFCM = async (email: string, tokenFCM: string) => {
        try {
            let informationFCM = new InformationFCMSchema({
                email: email,
                tokenFCM: tokenFCM
            });
            const tokenFCMExists = await this.MongoDBC.InformationFCMSchema.findOne(
                {
                    tokenFCM: { $eq: tokenFCM }
                }
            );
            if (tokenFCMExists != null) {
                return false;
            }
            const newInformationFCM = await informationFCM.save();
            if (newInformationFCM._id) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(`Error in userModel insertTokenFCM: ${error}`)
            return false;
        }
    }

    public deleteTokenFCM = async (tokenFCM: string, fn: Function) => {
        try {
            this.MongoDBC.connection();
            await this.MongoDBC.InformationFCMSchema.deleteOne(
                {
                    tokenFCM: tokenFCM
                }
            );
            fn({ success: "Record deleted successfully" });
        } catch (error) {
            console.log(`Error in userModel deleteTokenFCM: ${error}`)
            fn({ error: "Error deleting record" });
        }
    }

    public getUsers = async (email: string, fn: Function) => {
        try {
            this.MongoDBC.connection();
            const userExists = await this.MongoDBC.UserSchema.findOne(
                {
                    email: { $eq: email }
                }
            );
            if (userExists === null) {
                return fn({
                    error: 'Email do not exists'
                });
            }
            const users = await this.MongoDBC.UserSchema.find({ email: { $ne: email } });
            return fn(users);
        } catch (error) {
            console.log(`Error in userModel login: ${error}`)
            return fn({
                error: error
            });
        }
    }
}

export default UserModel;