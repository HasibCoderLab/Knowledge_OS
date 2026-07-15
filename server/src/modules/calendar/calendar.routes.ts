import { Router } from 'express';
import * as calendarController from './calendar.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/events', authenticate, calendarController.getCalendarEvents);

export default router;
