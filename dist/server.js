"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const generateResources_scripts_1 = require("./modules/ressources/scripts/generateResources.scripts");
const database_1 = require("./utils/database");
const logger_1 = require("./utils/logger");
const port = env_1.env.PORT;
const server = app_1.default.listen(port, async () => {
    await (0, database_1.connectDB)();
    await (0, generateResources_scripts_1.generateResourceAuto)();
    logger_1.logger.info(`Server listening on http://localhost:${port}`);
});
const gracefulShutdown = (signal) => {
    return () => {
        logger_1.logger.info(`Received ${signal}. Closing server.`);
        server.close(() => {
            logger_1.logger.info('HTTP server closed. Exiting.');
            process.exit(0);
        });
    };
};
process.on('SIGINT', gracefulShutdown('SIGINT'));
process.on('SIGTERM', gracefulShutdown('SIGTERM'));
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught exception', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.logger.error('Unhandled rejection', reason);
    process.exit(1);
});
//# sourceMappingURL=server.js.map