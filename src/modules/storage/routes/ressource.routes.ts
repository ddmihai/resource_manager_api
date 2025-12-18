import { Router } from 'express';
import { getResourceById } from '../controllers/getResourceById';
import { createResource } from '../controllers/createResource';

const resourceRouter = Router();


// get resource by id
resourceRouter.get('/resource/:id', getResourceById);

// create resource
resourceRouter.post('/create-resource', createResource);



export default resourceRouter;