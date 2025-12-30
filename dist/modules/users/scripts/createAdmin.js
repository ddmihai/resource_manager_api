"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminAtStartup = void 0;
const env_1 = require("../../../config/env");
const logger_1 = require("../../../utils/logger");
const User_service_1 = require("../services/User.service");
// create admin at startup script
const createAdminAtStartup = async () => {
    try {
        // Implementation for creating admin user at startup
        await User_service_1.UserService.CreateUser({
            fullName: 'Admin User',
            role: 'admin',
            email: env_1.env.ADMIN_EMAIL,
            password: env_1.env.ADMIN_PASSWORD
        }, true);
    }
    catch (error) {
        logger_1.logger.error('Error creating admin user at startup:', error);
        return;
    }
};
exports.createAdminAtStartup = createAdminAtStartup;
//# sourceMappingURL=createAdmin.js.map