import { Router } from 'express';
import * as usersController from './users.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/me', authenticate, usersController.getProfile);
router.patch('/me', authenticate, usersController.updateProfile);

export default router;
