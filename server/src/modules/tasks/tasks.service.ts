import { tasksRepository } from './tasks.repository.js';
import { prisma } from '../../app/config/database.js';
import { NotFoundError } from '../../shared/errors.js';
import type { CreateTaskInput, UpdateTaskInput, TasksQuery } from './tasks.validation.js';

export const tasksService = {
  async getTasks(userId: string, query: TasksQuery) {
    return tasksRepository.findByUser(userId, query);
  },

  async getTask(userId: string, id: string) {
    const task = await tasksRepository.findByUserAndId(userId, id);
    if (!task) {
      throw new NotFoundError('Task');
    }
    return task;
  },

  async createTask(userId: string, input: CreateTaskInput) {
    if (input.goalId) {
      const goal = await prisma.goal.findFirst({
        where: { id: input.goalId, userId },
      });
      if (!goal) {
        throw new NotFoundError('Goal');
      }
    }

    return tasksRepository.create(userId, input);
  },

  async updateTask(userId: string, id: string, input: UpdateTaskInput) {
    const existing = await tasksRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Task');
    }

    if (input.goalId) {
      const goal = await prisma.goal.findFirst({
        where: { id: input.goalId, userId },
      });
      if (!goal) {
        throw new NotFoundError('Goal');
      }
    }

    return tasksRepository.update(id, input);
  },

  async deleteTask(userId: string, id: string) {
    const existing = await tasksRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Task');
    }

    await tasksRepository.delete(id);
  },
};
