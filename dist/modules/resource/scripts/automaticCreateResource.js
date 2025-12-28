"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAutomaticallyRessource = void 0;
const ressources_1 = require("../data/ressources");
const resource_service_1 = require("../services/resource.service");
const createAutomaticallyRessource = async () => {
    for (const r of ressources_1.RESOURCES) {
        await resource_service_1.ResourceService.CreateResource(r, true);
    }
};
exports.createAutomaticallyRessource = createAutomaticallyRessource;
//# sourceMappingURL=automaticCreateResource.js.map