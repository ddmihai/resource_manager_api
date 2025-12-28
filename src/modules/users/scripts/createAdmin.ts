import { env } from "../../../config/env";
import { logger } from "../../../utils/logger";
import { UserService } from "../services/User.service";


// create admin at startup script
export const createAdminAtStartup = async () => {
    try {
        // Implementation for creating admin user at startup
        await UserService.CreateUser({
            fullName: 'Admin User',
            role: 'admin',
            email: env.ADMIN_EMAIL,
            password: env.ADMIN_PASSWORD
        }, true);
    }
    catch (error) {
        logger.error('Error creating admin user at startup:', error);
        return;
    }
};