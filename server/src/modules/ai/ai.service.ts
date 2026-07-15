import { aiRepository } from './ai.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import type { CreateConversationInput, AddMessageInput, ConversationsQuery } from './ai.validation.js';

export const aiService = {
  async createConversation(userId: string, input: CreateConversationInput) {
    return aiRepository.create(userId, input);
  },

  async getConversations(userId: string, query: ConversationsQuery) {
    return aiRepository.findByUser(userId, query);
  },

  async getConversation(userId: string, id: string) {
    const conversation = await aiRepository.findByUserAndId(userId, id);
    if (!conversation) {
      throw new NotFoundError('Conversation');
    }
    return conversation;
  },

  async addMessage(userId: string, id: string, input: AddMessageInput) {
    const conversation = await aiRepository.findByUserAndId(userId, id);
    if (!conversation) {
      throw new NotFoundError('Conversation');
    }

    return aiRepository.addMessage(id, input.role, input.content);
  },

  async deleteConversation(userId: string, id: string) {
    const existing = await aiRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Conversation');
    }

    await aiRepository.delete(id);
  },
};
