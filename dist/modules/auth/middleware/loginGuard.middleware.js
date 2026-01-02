"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../../../middleware/errorHandler");
const env_1 = require("../../../config/env");
const User_service_1 = require("../../users/services/User.service");
async function authGuard(req, _res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new errorHandler_1.ApiError("Unauthorized", 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_ACCESS_TOKEN_SECRET);
        // basic shape check
        const { _id, role, email } = decoded;
        if (!_id || !role || !email) {
            throw new errorHandler_1.ApiError("Invalid token payload", 401);
        }
        // check if the user exists
        const existingUser = await User_service_1.UserService.FindUserById(_id);
        if (!existingUser) {
            throw new errorHandler_1.ApiError("User not found", 401);
        }
        req.user = { _id, role, email };
        return next();
    }
    catch (err) {
        return next(new errorHandler_1.ApiError("Unauthorized", 401));
    }
}
//# sourceMappingURL=loginGuard.middleware.js.map