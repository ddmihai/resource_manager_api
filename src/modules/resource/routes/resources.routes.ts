import { Router } from 'express';
import { rateLimiters } from '../../../middleware/rateLimiter';
import { getAllRessources } from '../controllers/getAllRessources';
import { createResource } from '../controllers/createResource';
import { getResourceById } from '../controllers/getResourceById';



const ressourceRouter = Router();

// get all ressources
ressourceRouter.get('/get-ressources', rateLimiters.api, getAllRessources);
ressourceRouter.post('/create-ressource', rateLimiters.api, createResource);
ressourceRouter.get('/get-resource/:id', rateLimiters.api, getResourceById);

ressourceRouter.put('/edit-resource', rateLimiters.api, getResourceById);



export default ressourceRouter;