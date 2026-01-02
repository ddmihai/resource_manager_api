"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const logger_1 = require("../../../utils/logger");
const User_service_1 = require("../services/User.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../config/env");
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // check if user exists
        let user = await User_service_1.UserService.FindUserByEmail(email);
        if (!user) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid credentials.'
            });
        }
        ;
        // check if password is correct
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid credentials.'
            });
        }
        ;
        // generate token
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
            email: user.email
        }, env_1.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        // setup the cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        return res.status(200).json({
            status: 'success',
            message: 'Login successful.'
        });
    }
    catch (error) {
        logger_1.logger.error('Error in loginController:', error);
        next(error);
    }
};
exports.loginController = loginController;
//# sourceMappingURL=loginUser.js.map