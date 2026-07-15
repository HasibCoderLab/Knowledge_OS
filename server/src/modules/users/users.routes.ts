import { Router } from 'express';
import * as usersController from './users.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { updateProfileSchema } from './users.validation.js';

const router = Router();

router.get('/me', authenticate, usersController.getProfile);
router.patch('/me', authenticate, validate(updateProfileSchema), usersController.updateProfile);

export default router;
