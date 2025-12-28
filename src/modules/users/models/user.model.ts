import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user';


const userSchema = new mongoose.Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v: string) => /^[a-zA-Z\s]+$/.test(v),
                message: (props: any) =>
                    `${props.value} is not a valid full name! Only letters and spaces are allowed.`,
            },
            minLength: 3,
            maxLength: 50,
        },

        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 128,
            select: false, // 🔒 IMPORTANT
        },

        avatar: {
            type: String,
            trim: true,
            default: '',
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        usersAllowedToSignup: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

userSchema.pre<HydratedDocument<IUser>>('save', async function () {
    if (!this.isModified('password')) return;

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
