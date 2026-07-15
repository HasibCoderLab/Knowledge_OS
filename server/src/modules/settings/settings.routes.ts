import { Router } from 'express';
import * as settingsController from './settings.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, settingsController.getSettings);

export default router;
