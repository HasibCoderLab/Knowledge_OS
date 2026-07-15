import { Router } from 'express';
import * as readingController from './reading.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import { createReadingSessionSchema, updateReadingSessionSchema, readingSessionsQuerySchema, idParamSchema } from './reading.validation.js';

const router = Router();

router.get('/sessions', authenticate, validateQuery(readingSessionsQuerySchema), readingController.getReadingSessions);
router.get('/sessions/:id', authenticate, validateParams(idParamSchema), readingController.getReadingSession);
router.post('/sessions', authenticate, validate(createReadingSessionSchema), readingController.createReadingSession);
router.patch('/sessions/:id', authenticate, validateParams(idParamSchema), validate(updateReadingSessionSchema), readingController.updateReadingSession);
router.delete('/sessions/:id', authenticate, validateParams(idParamSchema), readingController.deleteReadingSession);

export default router;
