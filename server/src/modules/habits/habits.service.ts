import { habitsRepository } from './habits.repository.js';
import { NotFoundError } from '../../shared/errors.js';
import { computeStreaks, computeCompletionPercentage } from '../../shared/streaks.js';
import type { CreateHabitInput, UpdateHabitInput, HabitsQuery, CreateHabitLogInput } from './habits.validation.js';

export const habitsService = {
  async getHabits(userId: string, query: HabitsQuery) {
    const result = await habitsRepository.findByUser(userId, query);

    const dataWithStreaks = result.data.map((habit) => {
      const completedDates = habit.logs
        .filter((l) => l.completed)
        .map((l) => l.date);
      const streaks = computeStreaks(completedDates);
      const completionPercentage = computeCompletionPercentage(habit.logs);
      const { logs, ...habitWithoutLogs } = habit;
      return { ...habitWithoutLogs, ...streaks, completionPercentage };
    });

    return { ...result, data: dataWithStreaks };
  },

  async getHabit(userId: string, id: string) {
    const habit = await habitsRepository.findByUserAndIdWithLogs(userId, id);
    if (!habit) {
      throw new NotFoundError('Habit');
    }

    const completedDates = habit.logs
      .filter((l) => l.completed)
      .map((l) => l.date);
    const streaks = computeStreaks(completedDates);
    const completionPercentage = computeCompletionPercentage(habit.logs);
    const { logs, ...habitWithoutLogs } = habit;
    return { ...habitWithoutLogs, ...streaks, completionPercentage };
  },

  async createHabit(userId: string, input: CreateHabitInput) {
    return habitsRepository.create(userId, input);
  },

  async updateHabit(userId: string, id: string, input: UpdateHabitInput) {
    const existing = await habitsRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Habit');
    }

    return habitsRepository.update(id, input);
  },

  async deleteHabit(userId: string, id: string) {
    const existing = await habitsRepository.findByUserAndId(userId, id);
    if (!existing) {
      throw new NotFoundError('Habit');
    }

    await habitsRepository.delete(id);
  },

  async getHabitLogs(userId: string, habitId: string) {
    const habit = await habitsRepository.findByUserAndId(userId, habitId);
    if (!habit) {
      throw new NotFoundError('Habit');
    }

    return habitsRepository.findLogsByHabitId(habitId);
  },

  async createHabitLog(userId: string, habitId: string, input: CreateHabitLogInput) {
    const habit = await habitsRepository.findByUserAndId(userId, habitId);
    if (!habit) {
      throw new NotFoundError('Habit');
    }

    const logDate = new Date(input.date);
    const existing = await habitsRepository.findLogByHabitIdAndDate(habitId, logDate);
    if (existing) {
      return habitsRepository.updateLog(existing.id, input.completed ?? true);
    }

    return habitsRepository.createLog(habitId, input);
  },
};
