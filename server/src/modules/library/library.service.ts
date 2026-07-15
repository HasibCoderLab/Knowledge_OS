import { libraryRepository } from './library.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import type { CreateBookInput, UpdateBookInput, BookQuery } from './library.validation.js';

export const libraryService = {
  async getLibrary(userId: string, query: BookQuery) {
    return libraryRepository.findByUser(userId, query);
  },

  async getBook(userId: string, id: string) {
    const book = await libraryRepository.findByUserAndId(userId, id);
    if (!book) {
      throw new NotFoundError('Book');
    }
    return book;
  },

  async createBook(userId: string, input: CreateBookInput) {
    const book = await libraryRepository.create(userId, input);
    return book;
  },

  async updateBook(userId: string, id: string, input: UpdateBookInput) {
    const existing = await libraryRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Book');
    }

    const book = await libraryRepository.update(id, input);
    return book;
  },

  async deleteBook(userId: string, id: string) {
    const existing = await libraryRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Book');
    }

    await libraryRepository.delete(id);
  },
};
