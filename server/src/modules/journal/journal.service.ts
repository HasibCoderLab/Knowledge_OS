import { journalRepository } from './journal.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import type { CreateJournalEntryInput, UpdateJournalEntryInput, JournalEntriesQuery } from './journal.validation.js';

export const journalService = {
  async getJournalEntries(userId: string, query: JournalEntriesQuery) {
    return journalRepository.findByUser(userId, query);
  },

  async getJournalEntry(userId: string, id: string) {
    const entry = await journalRepository.findByUserAndId(userId, id);
    if (!entry) {
      throw new NotFoundError('Journal entry');
    }
    return entry;
  },

  async createJournalEntry(userId: string, input: CreateJournalEntryInput) {
    const entry = await journalRepository.create(userId, input);
    return entry;
  },

  async updateJournalEntry(userId: string, id: string, input: UpdateJournalEntryInput) {
    const existing = await journalRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Journal entry');
    }

    const entry = await journalRepository.update(id, input);
    return entry;
  },

  async deleteJournalEntry(userId: string, id: string) {
    const existing = await journalRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Journal entry');
    }

    await journalRepository.delete(id);
  },
};
