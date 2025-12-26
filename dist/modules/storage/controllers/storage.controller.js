"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageController = void 0;
const storage_service_1 = require("../services/storage.service");
exports.storageController = {
    list(_req, res) {
        const data = storage_service_1.StorageService.list();
        res.json(data);
    },
};
//# sourceMappingURL=storage.controller.js.map