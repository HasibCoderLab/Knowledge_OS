import { Router } from 'express';
import * as tasksController from './tasks.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import { createTaskSchema, updateTaskSchema, tasksQuerySchema, idParamSchema } from './tasks.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(tasksQuerySchema), tasksController.getTasks);
router.get('/:id', authenticate, validateParams(idParamSchema), tasksController.getTask);
router.post('/', authenticate, validate(createTaskSchema), tasksController.createTask);
router.patch('/:id', authenticate, validateParams(idParamSchema), validate(updateTaskSchema), tasksController.updateTask);
router.delete('/:id', authenticate, validateParams(idParamSchema), tasksController.deleteTask);

export default router;
