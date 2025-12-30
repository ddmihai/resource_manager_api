"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => /^[a-zA-Z\s]+$/.test(v),
            message: (props) => `${props.value} is not a valid full name! Only letters and spaces are allowed.`,
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
}, { timestamps: true });
userSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    const saltRounds = 10;
    this.password = await bcryptjs_1.default.hash(this.password, saltRounds);
});
userSchema.methods.comparePassword = async function (candidate) {
    // `this.password` exists only if it's selected
    return bcryptjs_1.default.compare(candidate, this.password);
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map