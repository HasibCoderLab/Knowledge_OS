import { Router } from 'express';
import * as goalsController from './goals.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import { createGoalSchema, updateGoalSchema, goalsQuerySchema, idParamSchema } from './goals.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(goalsQuerySchema), goalsController.getGoals);
router.get('/:id', authenticate, validateParams(idParamSchema), goalsController.getGoal);
router.post('/', authenticate, validate(createGoalSchema), goalsController.createGoal);
router.patch('/:id', authenticate, validateParams(idParamSchema), validate(updateGoalSchema), goalsController.updateGoal);
router.delete('/:id', authenticate, validateParams(idParamSchema), goalsController.deleteGoal);

export default router;
