import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { journalService } from './journal.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { JournalEntriesQuery } from './journal.validation.js';

export const getJournalEntries = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = res.locals.validatedQuery as JournalEntriesQuery;
  const result = await journalService.getJournalEntries(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getJournalEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const entry = await journalService.getJournalEntry(req.user!.userId, req.params.id as string);
  sendSuccess(res, entry);
});

export const createJournalEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const entry = await journalService.createJournalEntry(req.user!.userId, req.body);
  sendSuccess(res, entry, 'Journal entry created successfully', 201);
});

export const updateJournalEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const entry = await journalService.updateJournalEntry(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, entry, 'Journal entry updated successfully');
});

export const deleteJournalEntry = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await journalService.deleteJournalEntry(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Journal entry deleted successfully');
});
