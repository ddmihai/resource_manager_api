"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_controller_1 = require("../controllers/storage.controller");
const router = (0, express_1.Router)();
router.get('/', storage_controller_1.storageController.list);
exports.default = router;
//# sourceMappingURL=storage.routes.js.map