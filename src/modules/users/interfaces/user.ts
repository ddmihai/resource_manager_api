import { HydratedDocument, Types } from "mongoose";

export interface IUser {
    fullName: string;
    role: "admin" | "user";
    email: string;
    password: string;
    avatar: string;
    isActive: boolean;
    usersAllowedToSignup: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Document type (includes mongoose fields + methods)
export type IUserDocument = HydratedDocument<IUser> & {
    comparePassword(candidate: string): Promise<boolean>;
};

// Optional: safe response type for API
export type UserSafe = Omit<IUser, "password"> & { id: string };
