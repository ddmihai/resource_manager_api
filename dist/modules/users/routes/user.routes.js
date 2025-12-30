"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupUser_1 = require("../controllers/signupUser");
const rateLimiter_1 = require("../../../middleware/rateLimiter");
const loginUser_1 = require("../controllers/loginUser");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', rateLimiter_1.rateLimiters.auth, signupUser_1.signupController);
userRouter.post('/login', rateLimiter_1.rateLimiters.auth, loginUser_1.loginController);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map