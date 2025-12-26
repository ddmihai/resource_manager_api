import rateLimit from 'express-rate-limit';

export const rateLimiters = {
    api: rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 600,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many requests, please try again later.' },
    }),

    auth: rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 20,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many attempts. Please wait and try again.' },
    }),

    sensitive: rateLimit({
        windowMs: 60 * 60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many requests for this action. Try again later.' },
    }),

    write: rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 120,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'Too many write requests. Slow down.' },
    }),
};
