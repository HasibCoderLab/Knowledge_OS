import { Router } from 'express';
import * as journalController from './journal.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate, validateParams, validateQuery } from '../../middleware/validate.middleware.js';
import { createJournalEntrySchema, updateJournalEntrySchema, journalEntriesQuerySchema, idParamSchema } from './journal.validation.js';

const router = Router();

router.get('/', authenticate, validateQuery(journalEntriesQuerySchema), journalController.getJournalEntries);
router.get('/:id', authenticate, validateParams(idParamSchema), journalController.getJournalEntry);
router.post('/', authenticate, validate(createJournalEntrySchema), journalController.createJournalEntry);
router.patch('/:id', authenticate, validateParams(idParamSchema), validate(updateJournalEntrySchema), journalController.updateJournalEntry);
router.delete('/:id', authenticate, validateParams(idParamSchema), journalController.deleteJournalEntry);

export default router;
