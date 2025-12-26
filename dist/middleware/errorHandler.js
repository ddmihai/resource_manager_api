"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
class ApiError extends Error {
    constructor(message, statusCode = 500, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.ApiError = ApiError;
function notFoundHandler(_req, res, next) {
    next(new ApiError('Resource not found', 404));
}
function errorHandler(err, _req, res, _next) {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const payload = {
        message: err.message || 'Internal server error',
    };
    if (err instanceof ApiError && err.details) {
        payload.details = err.details;
    }
    res.status(statusCode).json(payload);
}
//# sourceMappingURL=errorHandler.js.map