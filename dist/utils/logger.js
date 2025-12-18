"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// Simple console-based logger; swap out with a real logger if needed.
exports.logger = {
    info: (...args) => console.log('[INFO]', ...args),
    warn: (...args) => console.warn('[WARN]', ...args),
    error: (...args) => console.error('[ERROR]', ...args)
};
//# sourceMappingURL=logger.js.map