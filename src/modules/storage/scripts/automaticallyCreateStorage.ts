// storageBlueprints.seedOnStartup.ts

import { logger } from "../../../utils/logger";
import { STORAGE_BLUEPRINTS_SEED } from "../data/storageBluePrintrs";
import { StorageBlueprintService } from "../services/storage.service";


export async function seedStorageBlueprintsOnStartup(): Promise<void> {
    logger.info("📦 Seeding storage blueprints...");

    for (const blueprint of STORAGE_BLUEPRINTS_SEED) {
        await StorageBlueprintService.CreateStorage(blueprint, true);
    }

    logger.info("✅ Storage blueprint seeding completed.");
}
