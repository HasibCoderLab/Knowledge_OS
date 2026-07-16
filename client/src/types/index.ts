export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  joinedAt?: string;
  createdAt?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
  stats: UserStats;
}

export interface UserStats {
  booksRead: number;
  currentStreak: number;
  longestStreak: number;
  totalPagesRead: number;
  totalNotes: number;
  completedHabits: number;
  completedTasks: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl: string;
  status: 'reading' | 'completed' | 'paused' | 'wishlist' | 'dropped';
  totalPages: number;
  currentPage: number;
  startDate: string | null;
  finishDate: string | null;
  rating: number | null;
  tags?: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  bookId?: string;
  bookTitle?: string;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completedToday: boolean;
  logs: HabitLog[];
  createdAt: string;
}

export interface HabitLog {
  date: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  type: 'short-term' | 'long-term';
  deadline: string;
  progress: number;
  status: 'active' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  isCompleted: boolean;
  category?: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  date: string;
  tags: string[];
  createdAt: string;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  bookTitle: string;
  date: string;
  pagesRead: number;
  durationMinutes: number;
  startPage: number;
  endPage: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'reading' | 'task' | 'habit' | 'goal' | 'journal' | 'other';
  description?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'achievement';
  read: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
