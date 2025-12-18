"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResourceAuto = void 0;
const resources_1 = require("../data/resources");
const ressource_service_1 = require("../services/ressource.service");
const generateResourceAuto = async () => {
    for (const resource of resources_1.RESOURCES) {
        const exists = await ressource_service_1.ResourceService.ResourceExists(resource.name);
        if (exists) {
            continue; // skip this one, but keep going
        }
        await ressource_service_1.ResourceService.createResource(resource);
    }
};
exports.generateResourceAuto = generateResourceAuto;
//# sourceMappingURL=generateResources.scripts.js.map