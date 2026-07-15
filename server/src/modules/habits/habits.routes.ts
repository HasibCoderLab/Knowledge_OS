import { Router } from 'express';
import * as habitsController from './habits.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import {
  createHabitSchema,
  updateHabitSchema,
  habitsQuerySchema,
  createHabitLogSchema,
  idParamSchema,
} from './habits.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(habitsQuerySchema), habitsController.getHabits);
router.get('/:id', authenticate, validateParams(idParamSchema), habitsController.getHabit);
router.post('/', authenticate, validate(createHabitSchema), habitsController.createHabit);
router.patch('/:id', authenticate, validateParams(idParamSchema), validate(updateHabitSchema), habitsController.updateHabit);
router.delete('/:id', authenticate, validateParams(idParamSchema), habitsController.deleteHabit);
router.get('/:id/logs', authenticate, validateParams(idParamSchema), habitsController.getHabitLogs);
router.post('/:id/log', authenticate, validateParams(idParamSchema), validate(createHabitLogSchema), habitsController.createHabitLog);

export default router;
