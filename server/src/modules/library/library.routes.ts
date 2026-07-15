import { Router } from 'express';
import * as libraryController from './library.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, libraryController.getLibrary);

export default router;
