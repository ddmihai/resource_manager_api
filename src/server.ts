import app from './app';
import { env } from './config/env';
import { generateResourceAuto } from './modules/ressources/scripts/generateResources.scripts';
import { connectDB } from './utils/database';
import { logger } from './utils/logger';

const port = env.PORT;

const server = app.listen(port, async () => {
  await connectDB();
  await generateResourceAuto();
  logger.info(`Server listening on http://localhost:${port}`);
});


const gracefulShutdown = (signal: string) => {
  return () => {
    logger.info(`Received ${signal}. Closing server.`);
    server.close(() => {
      logger.info('HTTP server closed. Exiting.');
      process.exit(0);
    });
  };
};

process.on('SIGINT', gracefulShutdown('SIGINT'));
process.on('SIGTERM', gracefulShutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', reason as Error);
  process.exit(1);
});
