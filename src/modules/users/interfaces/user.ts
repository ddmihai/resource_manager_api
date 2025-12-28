import { Document } from 'mongoose';

export interface IUser {
    fullName: string;
    role: 'admin' | 'user';
    email: string;
    password: string;
    avatar: string;
    isActive: boolean;
    usersAllowedToSignup: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IUserDocument extends IUser, Document {
    comparePassword(candidate: string): Promise<boolean>;
}
