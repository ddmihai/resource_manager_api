import { Router } from 'express';
import { authGuard } from '../../auth/middleware/loginGuard.middleware';
import { createOwnershipStorage } from '../controllers/createOwnershipStorage';
import { rateLimiters } from '../../../middleware/rateLimiter';


const storageRouter = Router();


storageRouter.post('/create-ownership', rateLimiters.api, authGuard, createOwnershipStorage);




export default storageRouter;