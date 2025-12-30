"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
exports.UserService = {
    // find User by email
    async FindUserByEmail(email) {
        return user_model_1.default.findOne({ email }).select('+password').exec();
    },
    // find user by id
    async FindUserById(id) {
        return user_model_1.default.findById(id).exec();
    },
    // create new user
    async CreateUser(userData, isAutomatic = false) {
        // check if there isnt another existing user with the same email
        const existingUser = await this.FindUserByEmail(userData.email);
        if (existingUser) {
            if (isAutomatic)
                return;
            throw new Error('User with this email already exists.');
        }
        ;
        // check if the system allows new user signups
        const anyUser = await user_model_1.default.findOne().exec();
        if (anyUser && !anyUser.usersAllowedToSignup) {
            throw new Error('New user signups are currently disabled.');
        }
        ;
        const newUser = new user_model_1.default(userData);
        return await newUser.save();
    }
};
//# sourceMappingURL=User.service.js.map