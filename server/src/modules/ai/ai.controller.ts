import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../types/index.js';
import { aiService } from './ai.service.js';
import { sendSuccess, sendPaginated } from '../../shared/response.js';
import { asyncHandler } from '../../shared/asyncHandler.js';
import type { ConversationsQuery } from './ai.validation.js';

export const getConversations = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const query = req.query as unknown as ConversationsQuery;
  const result = await aiService.getConversations(req.user!.userId, query);
  sendPaginated(res, result.data, result.total, result.page, result.limit);
});

export const getConversation = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const conversation = await aiService.getConversation(req.user!.userId, req.params.id as string);
  sendSuccess(res, conversation);
});

export const createConversation = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const conversation = await aiService.createConversation(req.user!.userId, req.body);
  sendSuccess(res, conversation, 'Conversation created successfully', 201);
});

export const addMessage = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const conversation = await aiService.addMessage(req.user!.userId, req.params.id as string, req.body);
  sendSuccess(res, conversation, 'Message added successfully');
});

export const deleteConversation = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await aiService.deleteConversation(req.user!.userId, req.params.id as string);
  sendSuccess(res, null, 'Conversation deleted successfully');
});
