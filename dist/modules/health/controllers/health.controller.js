"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
const health_service_1 = require("../services/health.service");
exports.healthController = {
    getStatus(_req, res) {
        const payload = health_service_1.HealthService.getStatus();
        res.json(payload);
    },
};
//# sourceMappingURL=health.controller.js.map