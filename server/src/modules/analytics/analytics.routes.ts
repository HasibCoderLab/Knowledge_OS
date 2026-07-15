import { Router } from 'express';
import * as analyticsController from './analytics.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/dashboard', authenticate, analyticsController.getDashboard);
router.get('/reading', authenticate, analyticsController.getReadingStats);
router.get('/goals', authenticate, analyticsController.getGoalsStats);
router.get('/tasks', authenticate, analyticsController.getTasksStats);
router.get('/habits', authenticate, analyticsController.getHabitsStats);

export default router;
