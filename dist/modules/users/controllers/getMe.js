"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const logger_1 = require("../../../utils/logger");
const User_service_1 = require("../services/User.service");
const getMe = async (req, res, next) => {
    try {
        // get the user from the req obj
        const userId = req.user;
        // validate user to exist in database
        const exsitingUser = await User_service_1.UserService.FindUserById(userId._id);
        return res.status(200).json({
            success: true,
            exsitingUser
        });
    }
    catch (error) {
        logger_1.logger.error('Error in get me controller', error);
        next(error);
    }
};
exports.getMe = getMe;
//# sourceMappingURL=getMe.js.map