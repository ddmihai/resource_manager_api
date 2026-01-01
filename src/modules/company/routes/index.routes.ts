import { Router } from 'express';
import { rateLimiters } from '../../../middleware/rateLimiter';
import { authGuard } from '../../auth/middleware/loginGuard.middleware';
import { createCompany } from '../controllers/createCompany.controller';
import { getUserCompanies } from '../controllers/getAllUserCompanies.controller';


const companyRouter = Router();


companyRouter.post('/create', rateLimiters.api, authGuard, createCompany);
companyRouter.get('/all', rateLimiters.api, authGuard, getUserCompanies);



export default companyRouter;