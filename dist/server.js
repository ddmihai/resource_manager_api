"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./utils/database");
const logger_1 = require("./utils/logger");
async function bootstrap() {
    try {
        await (0, database_1.connectDB)();
        const server = app_1.default.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`Server listening on http://localhost:${env_1.env.PORT}`);
        });
        const shutdown = async () => {
            logger_1.logger.info('Shutting down server...');
            server.close(() => process.exit(0));
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }
    catch (error) {
        logger_1.logger.error('Failed to start the application', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=server.js.map