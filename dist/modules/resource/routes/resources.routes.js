"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rateLimiter_1 = require("../../../middleware/rateLimiter");
const getAllRessources_1 = require("../controllers/getAllRessources");
const createResource_1 = require("../controllers/createResource");
const getResourceById_1 = require("../controllers/getResourceById");
const editResource_1 = require("../controllers/editResource");
const ressourceRouter = (0, express_1.Router)();
// get all ressources
ressourceRouter.get('/get-ressources', rateLimiter_1.rateLimiters.api, getAllRessources_1.getAllRessources);
ressourceRouter.post('/create-ressource', rateLimiter_1.rateLimiters.api, createResource_1.createResource);
ressourceRouter.get('/get-resource/:id', rateLimiter_1.rateLimiters.api, getResourceById_1.getResourceById);
ressourceRouter.put('/edit-resource', rateLimiter_1.rateLimiters.api, editResource_1.editResource);
exports.default = ressourceRouter;
//# sourceMappingURL=resources.routes.js.map