import app from './app';
import { env } from './config/env';
import { createAutomaticallyRessource } from './modules/resource/scripts/automaticCreateResource';
import { seedStorageBlueprintsOnStartup } from './modules/storage/scripts/automaticallyCreateStorage';
import { connectDB } from './utils/database';
import { logger } from './utils/logger';


async function bootstrap() {
  try {
    await connectDB();
    await createAutomaticallyRessource();
    await seedStorageBlueprintsOnStartup();


    const server = app.listen(env.PORT, () => {
      logger.info(`Server listening on http://localhost:${env.PORT}`);
    });

    const shutdown = async () => {
      logger.info('Shutting down server...');
      server.close(() => process.exit(0));
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    logger.error('Failed to start the application', error);
    process.exit(1);
  }
}

bootstrap();
