"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().int().positive().default(3000),
    MONGO_URI: zod_1.z.string().min(1, 'MONGO_URI is required'),
    // admin credentials for initial setup
    ADMIN_EMAIL: zod_1.z.string().email().min(1, 'ADMIN_EMAIL is required'),
    ADMIN_PASSWORD: zod_1.z.string().min(6, 'ADMIN_PASSWORD must be at least 6 characters long'),
    JWT_ACCESS_TOKEN_SECRET: zod_1.z.string().min(1, 'JWT_ACCESS_TOKEN_SECRET is required'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('Invalid environment variables', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
}
exports.env = parsed.data;
exports.isProduction = exports.env.NODE_ENV === 'production';
//# sourceMappingURL=env.js.map