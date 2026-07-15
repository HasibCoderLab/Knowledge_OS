import { Router } from 'express';
import * as readingController from './reading.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/sessions', authenticate, readingController.getReadingSessions);

export default router;
