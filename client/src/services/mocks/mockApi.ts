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

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Mutable state for notes CRUD
let notesData: Note[] = MOCK_NOTES.map((n) => ({ ...n, tags: [...n.tags] }));

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

  // Habits
  async getHabits(): Promise<ApiResponse<Habit[]>> {
    await sleep(600);
    return { success: true, data: MOCK_HABITS };
  },

  async getHabitStats(): Promise<ApiResponse<{ totalCompletions: number; currentStreak: number; longestStreak: number }>> {
    await sleep(500);
    const totalCompletions = MOCK_HABITS.reduce((sum, h) => sum + h.logs.filter(l => l.completed).length, 0);
    return {
      success: true,
      data: {
        totalCompletions,
        currentStreak: Math.max(...MOCK_HABITS.map(h => h.streak)),
        longestStreak: Math.max(...MOCK_HABITS.map(h => h.streak)),
      },
    };
  },

  // Goals
  async getGoals(): Promise<ApiResponse<Goal[]>> {
    await sleep(700);
    return { success: true, data: MOCK_GOALS };
  },

  // Tasks
  async getTasks(): Promise<ApiResponse<Task[]>> {
    await sleep(500);
    return { success: true, data: MOCK_TASKS };
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task | undefined>> {
    await sleep(300);
    const task = MOCK_TASKS.find((t) => t.id === id);
    if (task) {
      Object.assign(task, updates);
    }
    return { success: true, data: task };
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
