"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const logger_1 = require("../../../utils/logger");
const User_service_1 = require("../services/User.service");
const signupController = async (req, res, next) => {
    try {
        const { email, password, fullName, role } = req.body;
        if (role === 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Admin account creation is not allowed through this endpoint.'
            });
        }
        const newUser = await User_service_1.UserService.CreateUser({
            email: email.toLowerCase().trim(),
            password: password.trim(),
            fullName: fullName.trim().toLowerCase(),
            role
        });
        console.log('New user created:', newUser);
        return res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Error in loginController:', error);
        next(error);
    }
};
exports.signupController = signupController;
//# sourceMappingURL=signupUser.js.map