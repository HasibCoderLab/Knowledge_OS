import { Router } from 'express';
import * as activitiesController from './activities.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateQuery } from '../../middleware/validate.middleware.js';
import { createActivitySchema, activitiesQuerySchema } from './activities.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(activitiesQuerySchema), activitiesController.getActivities);
router.get('/recent', authenticate, activitiesController.getRecentActivities);
router.post('/', authenticate, validate(createActivitySchema), activitiesController.createActivity);

export default router;
