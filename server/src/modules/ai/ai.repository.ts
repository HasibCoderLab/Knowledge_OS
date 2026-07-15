import { prisma } from '../../app/config/database.js';
import type { CreateConversationInput, ConversationsQuery } from './ai.validation.js';

export const aiRepository = {
  async create(userId: string, data: CreateConversationInput) {
    return prisma.aIConversation.create({
      data: {
        userId,
        title: data.title ?? null,
        messages: data.messages ?? [],
      },
    });
  },

  async findById(id: string) {
    return prisma.aIConversation.findUnique({ where: { id } });
  },

  async findByUserAndId(userId: string, id: string) {
    return prisma.aIConversation.findFirst({
      where: { id, userId },
    });
  },

  async findByUser(userId: string, query: ConversationsQuery) {
    const { page, limit, search, sortBy, sortOrder } = query;
    const where: Record<string, unknown> = { userId };

    if (search) where.title = { contains: search };

    const [data, total] = await Promise.all([
      prisma.aIConversation.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.aIConversation.count({ where }),
    ]);

    return { data, total, page, limit };
  },

  async addMessage(id: string, role: string, content: string) {
    const conversation = await prisma.aIConversation.findUnique({ where: { id } });
    if (!conversation) return null;

    const messages = conversation.messages as Array<{ role: string; content: string; createdAt: string }>;
    const newMessage = { role, content, createdAt: new Date().toISOString() };

    return prisma.aIConversation.update({
      where: { id },
      data: {
        messages: [...messages, newMessage],
      },
    });
  },

  async delete(id: string) {
    return prisma.aIConversation.delete({ where: { id } });
  },
};
