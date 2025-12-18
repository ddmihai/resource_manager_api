import { Router } from 'express';
import healthRoutes from './health/routes';
import resourceRouter from './ressources/routes/ressource.routes';

const router = Router();

// Mount module routers
router.use('/health', healthRoutes);

// resource routes
router.use('/api', resourceRouter);


export default router;
