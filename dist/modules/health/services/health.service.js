"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
exports.HealthService = {
    getStatus() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    },
};
//# sourceMappingURL=health.service.js.map