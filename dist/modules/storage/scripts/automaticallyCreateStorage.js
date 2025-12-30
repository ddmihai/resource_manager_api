"use strict";
// storageBlueprints.seedOnStartup.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedStorageBlueprintsOnStartup = seedStorageBlueprintsOnStartup;
const logger_1 = require("../../../utils/logger");
const storageBluePrintrs_1 = require("../data/storageBluePrintrs");
const storage_service_1 = require("../services/storage.service");
async function seedStorageBlueprintsOnStartup() {
    logger_1.logger.info("📦 Seeding storage blueprints...");
    for (const blueprint of storageBluePrintrs_1.STORAGE_BLUEPRINTS_SEED) {
        await storage_service_1.StorageBlueprintService.CreateStorage(blueprint, true);
    }
    logger_1.logger.info("✅ Storage blueprint seeding completed.");
}
//# sourceMappingURL=automaticallyCreateStorage.js.map