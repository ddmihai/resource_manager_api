import User from "../models/user.model";
import { IUser } from "../interfaces/user";


export const UserService = {
    // find User by email
    async FindUserByEmail(email: string) {
        return User.findOne({ email }).select('+password').exec();
    },


    // find user by id
    async FindUserById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    },

    // create new user
    async CreateUser(userData: Partial<IUser>, isAutomatic: boolean = false) {
        // check if there isnt another existing user with the same email
        const existingUser = await this.FindUserByEmail(userData.email!);
        if (existingUser) {
            if (isAutomatic) return;
            throw new Error('User with this email already exists.');
        };

        // check if the system allows new user signups
        const anyUser = await User.findOne().exec();
        if (anyUser && !anyUser.usersAllowedToSignup) {
            throw new Error('New user signups are currently disabled.');
        };

        const newUser = new User(userData);
        return await newUser.save();
    }
}