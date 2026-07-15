import { readingRepository } from './reading.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import type { CreateReadingSessionInput, UpdateReadingSessionInput, ReadingSessionsQuery } from './reading.validation.js';

export const readingService = {
  async getReadingSessions(userId: string, query: ReadingSessionsQuery) {
    return readingRepository.findByUser(userId, query);
  },

  async getReadingSession(userId: string, id: string) {
    const session = await readingRepository.findByUserAndId(userId, id);
    if (!session) {
      throw new NotFoundError('Reading session');
    }
    return session;
  },

  async createReadingSession(userId: string, input: CreateReadingSessionInput) {
    const session = await readingRepository.create(userId, input);
    return session;
  },

  async updateReadingSession(userId: string, id: string, input: UpdateReadingSessionInput) {
    const existing = await readingRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Reading session');
    }

    const session = await readingRepository.update(id, input);
    return session;
  },

  async deleteReadingSession(userId: string, id: string) {
    const existing = await readingRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Reading session');
    }

    await readingRepository.delete(id);
  },
};
