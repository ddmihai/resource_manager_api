"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUpgradeType = void 0;
/** Upgrades are stored separately (Option 2) */
var StorageUpgradeType;
(function (StorageUpgradeType) {
    StorageUpgradeType["CAPACITY_FLAT"] = "capacity_flat";
    StorageUpgradeType["CAPACITY_PERCENT"] = "capacity_percent";
    StorageUpgradeType["INPUT_RATE_PERCENT"] = "input_rate_percent";
    StorageUpgradeType["DISCHARGE_REDUCTION"] = "discharge_reduction"; // -0.01 (absolute rate), or % if you prefer
})(StorageUpgradeType || (exports.StorageUpgradeType = StorageUpgradeType = {}));
//# sourceMappingURL=storage.js.map