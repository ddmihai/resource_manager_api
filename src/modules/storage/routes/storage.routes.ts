import { Router } from 'express';
import { authGuard } from '../../auth/middleware/loginGuard.middleware';
import { createOwnershipStorage } from '../controllers/createOwnershipStorage';
import { rateLimiters } from '../../../middleware/rateLimiter';
import { getAllStoragesBluePrints } from '../controllers/getAllStorages';


const storageRouter = Router();


storageRouter.get('/all-storage-blueprints', rateLimiters.api, authGuard, getAllStoragesBluePrints);
storageRouter.post('/create-ownership', rateLimiters.api, authGuard, createOwnershipStorage);




export default storageRouter;