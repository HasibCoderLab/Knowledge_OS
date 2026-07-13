export const MOCK_USER = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?u=user-1',
  preferences: {
    theme: 'dark',
    language: 'en',
  },
};

export const MOCK_BOOKS = [
  {
    id: 'book-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    coverUrl: 'https://m.media-amazon.com/images/I/51-UXS-OndL._SY445_SX342_.jpg',
    status: 'reading',
    totalPages: 320,
    currentPage: 145,
    startDate: '2024-01-10',
    rating: 5,
  },
  {
    id: 'book-2',
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Productivity',
    coverUrl: 'https://m.media-amazon.com/images/I/4176vS7k-hL._SY445_SX342_.jpg',
    status: 'completed',
    totalPages: 280,
    currentPage: 280,
    startDate: '2023-11-15',
    finishDate: '2023-12-20',
    rating: 4,
  },
  {
    id: 'book-3',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    coverUrl: 'https://m.media-amazon.com/images/I/71SAt7X9SFL._SY445_SX342_.jpg',
    status: 'wishlist',
    totalPages: 499,
    currentPage: 0,
    startDate: null,
    rating: null,
  },
];

export const MOCK_HABITS = [
  { id: 'habit-1', name: 'Read 30 Pages', streak: 12, completedToday: true },
  { id: 'habit-2', name: 'Exercise', streak: 5, completedToday: false },
  { id: 'habit-3', name: 'Coding Practice', streak: 45, completedToday: true },
];

export const MOCK_GOALS = [
  { id: 'goal-1', title: 'Read 24 Books in 2024', progress: 35, deadline: '2024-12-31', priority: 'high' },
  { id: 'goal-2', title: 'Master MERN Stack', progress: 60, deadline: '2024-06-01', priority: 'medium' },
];
