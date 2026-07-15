import { Router } from 'express';
import * as goalsController from './goals.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, goalsController.getGoals);

export default router;
