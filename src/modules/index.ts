import { Router } from 'express';
import healthRouter from './health/routes/health.routes';
import storageRouter from './storage/routes/storage.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/storage', storageRouter);

export default router;
