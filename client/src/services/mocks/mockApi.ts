import {
  MOCK_USER,
  MOCK_BOOKS,
  MOCK_NOTES,
  MOCK_HABITS,
  MOCK_GOALS,
  MOCK_TASKS,
  MOCK_JOURNAL,
  MOCK_READING_SESSIONS,
  MOCK_EVENTS,
  MOCK_NOTIFICATIONS,
} from './mockData';
import type {
  User, Book, Note, Habit, Goal, Task,
  JournalEntry, ReadingSession, CalendarEvent, Notification,
  ApiResponse,
} from '../../types';
import type {
  AnalyticsDataPoint, AnalyticsCategory,
  WeeklyReport, MonthlyReport, AIInsight,
  DaySchedule,
} from './mockData';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Mutable state for CRUD
let notesData: Note[] = MOCK_NOTES.map((n) => ({ ...n, tags: [...n.tags] }));
let goalsData: Goal[] = MOCK_GOALS.map((g) => ({ ...g }));
let habitsData: Habit[] = MOCK_HABITS.map((h) => ({ ...h, logs: [...h.logs] }));
let tasksData: Task[] = MOCK_TASKS.map((t) => ({ ...t }));

export const mockApi = {
  // User
  async getUser(): Promise<ApiResponse<User>> {
    await sleep(500);
    return { success: true, data: MOCK_USER };
  },

  // Books
  async getBooks(): Promise<ApiResponse<Book[]>> {
    await sleep(800);
    return { success: true, data: MOCK_BOOKS };
  },

  async getBook(id: string): Promise<ApiResponse<Book | undefined>> {
    await sleep(400);
    const book = MOCK_BOOKS.find((b) => b.id === id);
    return { success: true, data: book };
  },

  async updateBookProgress(id: string, page: number): Promise<ApiResponse<null>> {
    await sleep(400);
    const book = MOCK_BOOKS.find((b) => b.id === id);
    if (book) {
      book.currentPage = page;
    }
    return { success: true, data: null };
  },

  // Notes (mutable state for CRUD)
  async getNotes(): Promise<ApiResponse<Note[]>> {
    await sleep(600);
    return { success: true, data: notesData };
  },

  async getNotesByBook(bookId: string): Promise<ApiResponse<Note[]>> {
    await sleep(400);
    const filtered = notesData.filter((n) => n.bookId === bookId);
    return { success: true, data: filtered };
  },

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Note>> {
    await sleep(500);
    const now = new Date().toISOString().split('T')[0]!;
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    notesData = [newNote, ...notesData];
    return { success: true, data: newNote };
  },

  async updateNote(id: string, updates: Partial<Note>): Promise<ApiResponse<Note | undefined>> {
    await sleep(400);
    const index = notesData.findIndex((n) => n.id === id);
    if (index === -1) return { success: true, data: undefined };
    notesData[index] = {
      ...notesData[index]!,
      ...updates,
      id,
      updatedAt: new Date().toISOString().split('T')[0]!,
    };
    return { success: true, data: notesData[index] };
  },

  async deleteNote(id: string): Promise<ApiResponse<null>> {
    await sleep(300);
    notesData = notesData.filter((n) => n.id !== id);
    return { success: true, data: null };
  },

  async togglePinNote(id: string): Promise<ApiResponse<Note | undefined>> {
    await sleep(200);
    const note = notesData.find((n) => n.id === id);
    if (!note) return { success: true, data: undefined };
    note.isPinned = !note.isPinned;
    note.updatedAt = new Date().toISOString().split('T')[0]!;
    return { success: true, data: note };
  },

  async toggleFavoriteNote(id: string): Promise<ApiResponse<Note | undefined>> {
    await sleep(200);
    const note = notesData.find((n) => n.id === id);
    if (!note) return { success: true, data: undefined };
    note.isFavorite = !note.isFavorite;
    note.updatedAt = new Date().toISOString().split('T')[0]!;
    return { success: true, data: note };
  },

  // Habits (mutable state for CRUD)
  async getHabits(): Promise<ApiResponse<Habit[]>> {
    await sleep(600);
    return { success: true, data: habitsData };
  },

  async getHabitStats(): Promise<ApiResponse<{ totalCompletions: number; currentStreak: number; longestStreak: number }>> {
    await sleep(500);
    const totalCompletions = habitsData.reduce((sum, h) => sum + h.logs.filter(l => l.completed).length, 0);
    return {
      success: true,
      data: {
        totalCompletions,
        currentStreak: Math.max(...habitsData.map(h => h.streak)),
        longestStreak: Math.max(...habitsData.map(h => h.streak)),
      },
    };
  },

  async createHabit(habit: Omit<Habit, 'id' | 'createdAt' | 'logs' | 'streak' | 'completedToday'>): Promise<ApiResponse<Habit>> {
    await sleep(500);
    const newHabit: Habit = {
      ...habit,
      id: `habit-${Date.now()}`,
      streak: 0,
      completedToday: false,
      logs: [],
      createdAt: new Date().toISOString().split('T')[0]!,
    };
    habitsData = [newHabit, ...habitsData];
    return { success: true, data: newHabit };
  },

  async updateHabit(id: string, updates: Partial<Habit>): Promise<ApiResponse<Habit | undefined>> {
    await sleep(400);
    const index = habitsData.findIndex((h) => h.id === id);
    if (index === -1) return { success: true, data: undefined };
    habitsData[index] = { ...habitsData[index]!, ...updates, id };
    return { success: true, data: habitsData[index] };
  },

  async deleteHabit(id: string): Promise<ApiResponse<null>> {
    await sleep(300);
    habitsData = habitsData.filter((h) => h.id !== id);
    return { success: true, data: null };
  },

  async toggleHabitCompletion(id: string): Promise<ApiResponse<Habit | undefined>> {
    await sleep(200);
    const habit = habitsData.find((h) => h.id === id);
    if (!habit) return { success: true, data: undefined };
    const today = new Date().toISOString().split('T')[0]!;
    const existing = habit.logs.find((l) => l.date === today);
    if (existing) {
      existing.completed = !existing.completed;
      habit.completedToday = existing.completed;
    } else {
      habit.logs.push({ date: today, completed: true });
      habit.completedToday = true;
    }
    habit.streak = habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1);
    return { success: true, data: habit };
  },

  // Goals (mutable state for CRUD)
  async getGoals(): Promise<ApiResponse<Goal[]>> {
    await sleep(700);
    return { success: true, data: goalsData };
  },

  async createGoal(goal: Omit<Goal, 'id' | 'createdAt'>): Promise<ApiResponse<Goal>> {
    await sleep(500);
    const newGoal: Goal = {
      ...goal,
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]!,
    };
    goalsData = [newGoal, ...goalsData];
    return { success: true, data: newGoal };
  },

  async updateGoal(id: string, updates: Partial<Goal>): Promise<ApiResponse<Goal | undefined>> {
    await sleep(400);
    const index = goalsData.findIndex((g) => g.id === id);
    if (index === -1) return { success: true, data: undefined };
    goalsData[index] = { ...goalsData[index]!, ...updates, id };
    return { success: true, data: goalsData[index] };
  },

  async deleteGoal(id: string): Promise<ApiResponse<null>> {
    await sleep(300);
    goalsData = goalsData.filter((g) => g.id !== id);
    return { success: true, data: null };
  },

  // Tasks (mutable state for CRUD)
  async getTasks(): Promise<ApiResponse<Task[]>> {
    await sleep(500);
    return { success: true, data: tasksData };
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<ApiResponse<Task>> {
    await sleep(500);
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]!,
    };
    tasksData = [newTask, ...tasksData];
    return { success: true, data: newTask };
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task | undefined>> {
    await sleep(300);
    const index = tasksData.findIndex((t) => t.id === id);
    if (index === -1) return { success: true, data: undefined };
    tasksData[index] = { ...tasksData[index]!, ...updates, id };
    return { success: true, data: tasksData[index] };
  },

  async deleteTask(id: string): Promise<ApiResponse<null>> {
    await sleep(300);
    tasksData = tasksData.filter((t) => t.id !== id);
    return { success: true, data: null };
  },

  // Journal
  async getJournalEntries(): Promise<ApiResponse<JournalEntry[]>> {
    await sleep(600);
    return { success: true, data: MOCK_JOURNAL };
  },

  // Reading Sessions
  async getReadingSessions(): Promise<ApiResponse<ReadingSession[]>> {
    await sleep(600);
    return { success: true, data: MOCK_READING_SESSIONS };
  },

  async getReadingSessionsByBook(bookId: string): Promise<ApiResponse<ReadingSession[]>> {
    await sleep(400);
    const sessions = MOCK_READING_SESSIONS.filter((s) => s.bookId === bookId);
    return { success: true, data: sessions };
  },

  // Analytics
  async getDailyActivity(): Promise<ApiResponse<AnalyticsDataPoint[]>> {
    await sleep(500);
    return { success: true, data: MOCK_DAILY_ACTIVITY };
  },

  async getReadingTrend(): Promise<ApiResponse<AnalyticsDataPoint[]>> {
    await sleep(500);
    return { success: true, data: MOCK_READING_TREND };
  },

  async getKnowledgeGrowth(): Promise<ApiResponse<AnalyticsDataPoint[]>> {
    await sleep(500);
    return { success: true, data: MOCK_KNOWLEDGE_GROWTH };
  },

  async getFocusHours(): Promise<ApiResponse<AnalyticsDataPoint[]>> {
    await sleep(500);
    return { success: true, data: MOCK_FOCUS_HOURS };
  },

  async getCategoryDistribution(): Promise<ApiResponse<AnalyticsCategory[]>> {
    await sleep(400);
    return { success: true, data: MOCK_CATEGORY_DISTRIBUTION };
  },

  async getWeeklyReports(): Promise<ApiResponse<WeeklyReport[]>> {
    await sleep(500);
    return { success: true, data: MOCK_WEEKLY_REPORTS };
  },

  async getMonthlyReports(): Promise<ApiResponse<MonthlyReport[]>> {
    await sleep(500);
    return { success: true, data: MOCK_MONTHLY_REPORTS };
  },

  async getAIInsights(): Promise<ApiResponse<AIInsight[]>> {
    await sleep(300);
    return { success: true, data: MOCK_AI_INSIGHTS };
  },

  async getDaySchedule(date: string): Promise<ApiResponse<DaySchedule | undefined>> {
    await sleep(300);
    const schedule = MOCK_DAY_SCHEDULES.find((s) => s.date === date);
    return { success: true, data: schedule };
  },

  // Calendar
  async getEvents(): Promise<ApiResponse<CalendarEvent[]>> {
    await sleep(400);
    return { success: true, data: MOCK_EVENTS };
  },

  // Notifications
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    await sleep(300);
    return { success: true, data: MOCK_NOTIFICATIONS };
  },

  async markNotificationRead(id: string): Promise<ApiResponse<null>> {
    await sleep(200);
    const notif = MOCK_NOTIFICATIONS.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
    }
    return { success: true, data: null };
  },
};
