import { goalsRepository } from './goals.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import type { CreateGoalInput, UpdateGoalInput, GoalsQuery } from './goals.validation.js';

function computeProgressPercentage(goal: { currentValue: number; targetValue: number }): number {
  if (goal.targetValue === 0) return 0;
  return Math.round((goal.currentValue / goal.targetValue) * 100);
}

export const goalsService = {
  async getGoals(userId: string, query: GoalsQuery) {
    const result = await goalsRepository.findByUser(userId, query);
    const data = result.data.map((goal) => ({
      ...goal,
      progressPercentage: computeProgressPercentage(goal),
    }));
    return { ...result, data };
  },

  async getGoal(userId: string, id: string) {
    const goal = await goalsRepository.findByUserAndId(userId, id);
    if (!goal) {
      throw new NotFoundError('Goal');
    }
    return { ...goal, progressPercentage: computeProgressPercentage(goal) };
  },

  async createGoal(userId: string, input: CreateGoalInput) {
    const goal = await goalsRepository.create(userId, input);
    return { ...goal, progressPercentage: computeProgressPercentage(goal) };
  },

  async updateGoal(userId: string, id: string, input: UpdateGoalInput) {
    const existing = await goalsRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Goal');
    }

    const goal = await goalsRepository.update(id, input);
    if (!goal) {
      throw new NotFoundError('Goal');
    }
    return { ...goal, progressPercentage: computeProgressPercentage(goal) };
  },

  async deleteGoal(userId: string, id: string) {
    const existing = await goalsRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Goal');
    }

    await goalsRepository.delete(id);
  },
};
