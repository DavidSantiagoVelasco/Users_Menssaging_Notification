"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoDBC_1 = __importDefault(require("../mongoDB/mongoDBC"));
const userSchema_1 = __importDefault(require("../mongoDB/schemas/userSchema"));
const informationFCMSchema_1 = __importDefault(require("../mongoDB/schemas/informationFCMSchema"));
class UserModel {
    constructor() {
        this.register = (email, password, name, surname, photo, position, number, tokenFCM, fn) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.MongoDBC.connection();
                let userDetails = new userSchema_1.default({
                    email: email,
                    password: password,
                    name: name,
                    surname: surname,
                    photo: photo,
                    position: position,
                    number: number
                });
                const userExists = yield this.MongoDBC.UserSchema.findOne({
                    email: { $eq: email }
                });
                if (userExists != null) {
                    return fn({
                        error: 'Email already exists'
                    });
                }
                const newUser = yield userDetails.save();
                if (newUser._id) {
                    yield this.insertTokenFCM(email, tokenFCM);
                    return fn({
                        success: 'Register success',
                        id: newUser._id
                    });
                }
                return fn({
                    error: 'Register error'
                });
            }
            catch (error) {
                console.log(`Error in userModel register: ${error}`);
                return fn({
                    error: error
                });
            }
        });
        this.login = (email, password, tokenFCM, fn) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.MongoDBC.connection();
                const userExists = yield this.MongoDBC.UserSchema.findOne({
                    email: { $eq: email }
                });
                if (userExists == null) {
                    return fn({
                        error: 'Email or password incorrect'
                    });
                }
                let compare = bcryptjs_1.default.compareSync(password, userExists.password);
                if (!compare) {
                    return fn({
                        error: 'Email or password incorrect'
                    });
                }
                yield this.insertTokenFCM(email, tokenFCM);
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
            }
            catch (error) {
                console.log(`Error in userModel login: ${error}`);
                return fn({
                    error: error
                });
            }
        });
        this.insertTokenFCM = (email, tokenFCM) => __awaiter(this, void 0, void 0, function* () {
            try {
                let informationFCM = new informationFCMSchema_1.default({
                    email: email,
                    tokenFCM: tokenFCM
                });
                const tokenFCMExists = yield this.MongoDBC.InformationFCMSchema.findOne({
                    tokenFCM: { $eq: tokenFCM }
                });
                if (tokenFCMExists != null) {
                    return false;
                }
                const newInformationFCM = yield informationFCM.save();
                if (newInformationFCM._id) {
                    return true;
                }
                return false;
            }
            catch (error) {
                console.log(`Error in userModel insertTokenFCM: ${error}`);
                return false;
            }
        });
        this.getUsers = (email, fn) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.MongoDBC.connection();
                const userExists = yield this.MongoDBC.UserSchema.findOne({
                    email: { $eq: email }
                });
                if (userExists === null) {
                    return fn({
                        error: 'Email do not exists'
                    });
                }
                const users = yield this.MongoDBC.UserSchema.find({ email: { $ne: email } });
                return fn(users);
            }
            catch (error) {
                console.log(`Error in userModel login: ${error}`);
                return fn({
                    error: error
                });
            }
        });
        this.MongoDBC = new mongoDBC_1.default();
    }
}
exports.default = UserModel;
