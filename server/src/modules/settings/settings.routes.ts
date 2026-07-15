import { Router } from 'express';
import * as settingsController from './settings.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { updateSettingsSchema } from './settings.validation.js';

const router = Router();

router.get('/', authenticate, settingsController.getSettings);
router.patch('/', authenticate, validate(updateSettingsSchema), settingsController.updateSettings);

export default router;
