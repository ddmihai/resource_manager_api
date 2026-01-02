"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rateLimiter_1 = require("../../../middleware/rateLimiter");
const loginGuard_middleware_1 = require("../../auth/middleware/loginGuard.middleware");
const createCompany_controller_1 = require("../controllers/createCompany.controller");
const getAllUserCompanies_controller_1 = require("../controllers/getAllUserCompanies.controller");
const companyRouter = (0, express_1.Router)();
companyRouter.post('/create', rateLimiter_1.rateLimiters.api, loginGuard_middleware_1.authGuard, createCompany_controller_1.createCompany);
companyRouter.get('/all', rateLimiter_1.rateLimiters.api, loginGuard_middleware_1.authGuard, getAllUserCompanies_controller_1.getUserCompanies);
exports.default = companyRouter;
//# sourceMappingURL=index.routes.js.map