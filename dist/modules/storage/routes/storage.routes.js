"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginGuard_middleware_1 = require("../../auth/middleware/loginGuard.middleware");
const createOwnershipStorage_1 = require("../controllers/createOwnershipStorage");
const rateLimiter_1 = require("../../../middleware/rateLimiter");
const getAllStorages_1 = require("../controllers/getAllStorages");
const storageRouter = (0, express_1.Router)();
storageRouter.get('/all-storage-blueprints', rateLimiter_1.rateLimiters.api, loginGuard_middleware_1.authGuard, getAllStorages_1.getAllStoragesBluePrints);
storageRouter.post('/create-ownership', rateLimiter_1.rateLimiters.api, loginGuard_middleware_1.authGuard, createOwnershipStorage_1.createOwnershipStorage);
exports.default = storageRouter;
//# sourceMappingURL=storage.routes.js.map