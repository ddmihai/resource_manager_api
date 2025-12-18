"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.ApiError = void 0;
const logger_1 = require("../utils/logger");
class ApiError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}
exports.ApiError = ApiError;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        message: 'Resource not found',
        path: req.originalUrl
    });
};
exports.notFoundHandler = notFoundHandler;
// Global error handler with a friendly JSON response.
// Disable eslint unused vars for next param because Express needs 4 args to detect error middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, req, res, next) => {
    const status = err instanceof ApiError ? err.status : 500;
    if (status >= 500) {
        logger_1.logger.error(err.message, err.stack);
    }
    else {
        logger_1.logger.warn(err.message);
    }
    res.status(status).json({
        message: err.message || 'Internal server error'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map