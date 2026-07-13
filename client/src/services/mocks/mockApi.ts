import { MOCK_USER, MOCK_BOOKS, MOCK_HABITS, MOCK_GOALS } from './mockData';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getUser() {
    await sleep(500);
    return { data: MOCK_USER };
  },

  async getBooks() {
    await sleep(800);
    return { data: MOCK_BOOKS };
  },

  async getHabits() {
    await sleep(600);
    return { data: MOCK_HABITS };
  },

  async getGoals() {
    await sleep(700);
    return { data: MOCK_GOALS };
  },

  async updateBookProgress(id: string, page: number) {
    await sleep(400);
    return { success: true };
  },
};
