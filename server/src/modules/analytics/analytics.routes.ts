import { Router } from 'express';
import * as analyticsController from './analytics.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, analyticsController.getAnalytics);

export default router;
