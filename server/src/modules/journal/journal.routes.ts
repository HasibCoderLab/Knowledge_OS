import { Router } from 'express';
import * as journalController from './journal.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, journalController.getJournalEntries);

export default router;
