"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupUser_1 = require("../controllers/signupUser");
const rateLimiter_1 = require("../../../middleware/rateLimiter");
const loginUser_1 = require("../controllers/loginUser");
const getMe_1 = require("../controllers/getMe");
const loginGuard_middleware_1 = require("../../auth/middleware/loginGuard.middleware");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', rateLimiter_1.rateLimiters.auth, signupUser_1.signupController);
userRouter.post('/login', rateLimiter_1.rateLimiters.auth, loginUser_1.loginController);
userRouter.get('/getMe', rateLimiter_1.rateLimiters.auth, loginGuard_middleware_1.authGuard, getMe_1.getMe);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map