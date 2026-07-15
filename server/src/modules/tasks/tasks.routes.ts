import { Router } from 'express';
import * as tasksController from './tasks.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, tasksController.getTasks);

export default router;
