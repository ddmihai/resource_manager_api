import { Router } from 'express';
import { storageController } from '../controllers/storage.controller';

const router = Router();

router.get('/', storageController.list);

export default router;
