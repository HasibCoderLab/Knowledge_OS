import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { libraryService } from './library.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { BookQuery } from './library.validation.js';

export const getLibrary = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = req.query as unknown as BookQuery;
  const result = await libraryService.getLibrary(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getBook = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const book = await libraryService.getBook(req.user!.userId, req.params.id as string);
  sendSuccess(res, book);
});

export const createBook = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const book = await libraryService.createBook(req.user!.userId, req.body);
  sendSuccess(res, book, 'Book created successfully', 201);
});

export const updateBook = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const book = await libraryService.updateBook(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, book, 'Book updated successfully');
});

export const deleteBook = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await libraryService.deleteBook(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Book deleted successfully');
});
