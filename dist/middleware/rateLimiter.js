"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiters = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimiters = {
    api: (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 600,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many requests, please try again later.' },
    }),
    auth: (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 20,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many attempts. Please wait and try again.' },
    }),
    sensitive: (0, express_rate_limit_1.default)({
        windowMs: 60 * 60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many requests for this action. Try again later.' },
    }),
    write: (0, express_rate_limit_1.default)({
        windowMs: 5 * 60 * 1000,
        max: 120,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many write requests. Slow down.' },
    }),
};
//# sourceMappingURL=rateLimiter.js.map