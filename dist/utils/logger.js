"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* Simple console-based logger to centralize logging */
exports.logger = {
    info: (message, ...meta) => console.log(`[INFO] ${message}`, ...meta),
    warn: (message, ...meta) => console.warn(`[WARN] ${message}`, ...meta),
    error: (message, ...meta) => console.error(`[ERROR] ${message}`, ...meta),
};
//# sourceMappingURL=logger.js.map