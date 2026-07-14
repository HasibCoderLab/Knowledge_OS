import type { User, Book, Note, Habit, Goal, Task, JournalEntry, ReadingSession, CalendarEvent, Notification } from '../../types';

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?u=user-1',
  bio: 'Life-long learner & knowledge enthusiast. Building my second brain.',
  location: 'San Francisco, CA',
  joinedAt: '2024-01-10',
  preferences: {
    theme: 'dark',
    language: 'en',
  },
  stats: {
    booksRead: 14,
    currentStreak: 12,
    longestStreak: 67,
    totalPagesRead: 4820,
    totalNotes: 89,
    completedHabits: 1247,
    completedTasks: 312,
  },
};

export const MOCK_BOOKS: Book[] = [
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
    finishDate: null,
    rating: null,
    tags: ['productivity', 'habits'],
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
    tags: ['focus', 'productivity'],
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
    finishDate: null,
    rating: null,
    tags: ['psychology', 'decision-making'],
  },
  {
    id: 'book-4',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    category: 'Technology',
    coverUrl: 'https://m.media-amazon.com/images/I/71f703u6GFL._SY445_SX342_.jpg',
    status: 'reading',
    totalPages: 352,
    currentPage: 89,
    startDate: '2024-02-01',
    finishDate: null,
    rating: null,
    tags: ['programming', 'software'],
  },
  {
    id: 'book-5',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'History',
    coverUrl: 'https://m.media-amazon.com/images/I/71+9Tl7cQjL._SY445_SX342_.jpg',
    status: 'completed',
    totalPages: 443,
    currentPage: 443,
    startDate: '2023-08-01',
    finishDate: '2023-10-15',
    rating: 5,
    tags: ['history', 'anthropology'],
  },
  {
    id: 'book-6',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Fiction',
    coverUrl: 'https://m.media-amazon.com/images/I/51B+JcrYqgL._SY445_SX342_.jpg',
    status: 'wishlist',
    totalPages: 688,
    currentPage: 0,
    startDate: null,
    finishDate: null,
    rating: null,
    tags: ['sci-fi', 'classic'],
  },
  {
    id: 'book-7',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Finance',
    coverUrl: 'https://m.media-amazon.com/images/I/71g2EDnjFJL._SY445_SX342_.jpg',
    status: 'reading',
    totalPages: 256,
    currentPage: 78,
    startDate: '2024-02-20',
    finishDate: null,
    rating: null,
    tags: ['finance', 'psychology'],
  },
  {
    id: 'book-8',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Technology',
    coverUrl: 'https://m.media-amazon.com/images/I/71T7aD3E7OL._SY445_SX342_.jpg',
    status: 'wishlist',
    totalPages: 464,
    currentPage: 0,
    startDate: null,
    finishDate: null,
    rating: null,
    tags: ['programming', 'software'],
  },
  {
    id: 'book-9',
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    category: 'Philosophy',
    coverUrl: 'https://m.media-amazon.com/images/I/71ayQ5xCN+L._SY445_SX342_.jpg',
    status: 'completed',
    totalPages: 242,
    currentPage: 242,
    startDate: '2024-01-05',
    finishDate: '2024-02-01',
    rating: 5,
    tags: ['philosophy', 'wealth'],
  },
  {
    id: 'book-10',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Technology',
    coverUrl: 'https://m.media-amazon.com/images/I/71n5Q1kGQNL._SY445_SX342_.jpg',
    status: 'wishlist',
    totalPages: 616,
    currentPage: 0,
    startDate: null,
    finishDate: null,
    rating: null,
    tags: ['architecture', 'distributed-systems'],
  },
];

export const MOCK_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'Key Insights from Atomic Habits',
    content: 'The Four Laws of Behavior Change:\n\n1. Make it Obvious\n2. Make it Attractive\n3. Make it Easy\n4. Make it Satisfying\n\nThe most important thing is to focus on systems, not goals.',
    bookId: 'book-1',
    bookTitle: 'Atomic Habits',
    tags: ['habits', 'productivity', 'atomic-habits'],
    isPinned: true,
    isFavorite: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'note-2',
    title: 'Deep Work Philosophy',
    content: 'Deep work is the ability to focus without distraction on a cognitively demanding task. Key strategies:\n- Schedule deep work blocks\n- Embrace boredom\n- Quit social media',
    bookId: 'book-2',
    bookTitle: 'Deep Work',
    tags: ['focus', 'productivity'],
    isPinned: false,
    isFavorite: true,
    createdAt: '2023-12-05',
    updatedAt: '2023-12-05',
  },
  {
    id: 'note-3',
    title: 'React Performance Tips',
    content: '1. Use React.memo for expensive components\n2. Implement virtualization for long lists\n3. Lazy load routes and components\n4. Use useMemo and useCallback wisely',
    tags: ['react', 'performance', 'coding'],
    isPinned: false,
    isFavorite: false,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-12',
  },
  {
    id: 'note-4',
    title: 'Book Ideas for Q2 2024',
    content: 'Reading list:\n- Design Patterns in Modern JavaScript\n- Clean Code\n- The Psychology of Money\n- Man\'s Search for Meaning',
    tags: ['reading', 'planning'],
    isPinned: false,
    isFavorite: false,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: 'note-5',
    title: 'Habit Stacking Strategy',
    content: 'After I [current habit], I will [new habit].\n\nExamples:\n- After I pour my morning coffee, I will meditate for 1 minute.\n- After I sit down to eat dinner, I will say one thing I\'m grateful for.',
    tags: ['habits', 'strategy'],
    isPinned: true,
    isFavorite: false,
    createdAt: '2024-01-25',
    updatedAt: '2024-02-01',
  },
];

export const MOCK_HABITS: Habit[] = [
  {
    id: 'habit-1',
    name: 'Read 30 Pages',
    description: 'Read at least 30 pages from any book',
    frequency: 'daily',
    streak: 12,
    completedToday: true,
    logs: [
      { date: '2024-03-10', completed: true },
      { date: '2024-03-11', completed: true },
      { date: '2024-03-12', completed: true },
      { date: '2024-03-13', completed: true },
      { date: '2024-03-14', completed: true },
    ],
    createdAt: '2024-01-01',
  },
  {
    id: 'habit-2',
    name: 'Exercise',
    description: '30 minutes of physical exercise',
    frequency: 'daily',
    streak: 5,
    completedToday: false,
    logs: [
      { date: '2024-03-10', completed: true },
      { date: '2024-03-11', completed: true },
      { date: '2024-03-12', completed: false },
      { date: '2024-03-13', completed: true },
    ],
    createdAt: '2024-01-01',
  },
  {
    id: 'habit-3',
    name: 'Coding Practice',
    description: 'Build something for at least 45 minutes',
    frequency: 'daily',
    streak: 45,
    completedToday: true,
    logs: [
      { date: '2024-03-10', completed: true },
      { date: '2024-03-11', completed: true },
      { date: '2024-03-12', completed: true },
      { date: '2024-03-13', completed: true },
      { date: '2024-03-14', completed: true },
    ],
    createdAt: '2024-01-01',
  },
  {
    id: 'habit-4',
    name: 'Meditate',
    description: '10 minutes of mindfulness meditation',
    frequency: 'daily',
    streak: 3,
    completedToday: true,
    logs: [
      { date: '2024-03-12', completed: true },
      { date: '2024-03-13', completed: true },
      { date: '2024-03-14', completed: true },
    ],
    createdAt: '2024-02-15',
  },
  {
    id: 'habit-5',
    name: 'Write in Journal',
    description: 'Write at least 100 words in journal',
    frequency: 'daily',
    streak: 0,
    completedToday: false,
    logs: [],
    createdAt: '2024-03-01',
  },
];

export const MOCK_GOALS: Goal[] = [
  {
    id: 'goal-1',
    title: 'Read 24 Books in 2024',
    description: 'Complete 24 books by December 31, 2024',
    type: 'long-term',
    deadline: '2024-12-31',
    progress: 35,
    status: 'active',
    priority: 'high',
    createdAt: '2024-01-01',
  },
  {
    id: 'goal-2',
    title: 'Master MERN Stack',
    description: 'Build 3 full-stack projects with MERN',
    type: 'long-term',
    deadline: '2024-06-01',
    progress: 60,
    status: 'active',
    priority: 'medium',
    createdAt: '2024-01-15',
  },
  {
    id: 'goal-3',
    title: 'Write 12 Blog Posts',
    description: 'Publish one blog post per month',
    type: 'short-term',
    deadline: '2024-12-31',
    progress: 25,
    status: 'active',
    priority: 'medium',
    createdAt: '2024-02-01',
  },
  {
    id: 'goal-4',
    title: 'Run 5K Daily',
    description: 'Build up to running 5 kilometers daily',
    type: 'short-term',
    deadline: '2024-04-30',
    progress: 100,
    status: 'completed',
    priority: 'high',
    createdAt: '2024-01-10',
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Finish Chapter 4 of Atomic Habits',
    description: 'Complete reading and take notes on habit stacking',
    priority: 'high',
    dueDate: '2024-03-15',
    isCompleted: false,
    category: 'reading',
    createdAt: '2024-03-10',
  },
  {
    id: 'task-2',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated deployment',
    priority: 'high',
    dueDate: '2024-03-18',
    isCompleted: false,
    category: 'coding',
    createdAt: '2024-03-11',
  },
  {
    id: 'task-3',
    title: 'Review pull request',
    priority: 'medium',
    dueDate: '2024-03-14',
    isCompleted: true,
    category: 'work',
    createdAt: '2024-03-12',
  },
  {
    id: 'task-4',
    title: 'Buy groceries',
    priority: 'low',
    dueDate: '2024-03-13',
    isCompleted: false,
    category: 'personal',
    createdAt: '2024-03-12',
  },
  {
    id: 'task-5',
    title: 'Plan Q2 goals',
    description: 'Draft objectives and key results for next quarter',
    priority: 'medium',
    dueDate: '2024-03-25',
    isCompleted: false,
    category: 'work',
    createdAt: '2024-03-10',
  },
  {
    id: 'task-6',
    title: 'Update portfolio website',
    priority: 'low',
    dueDate: null,
    isCompleted: false,
    category: 'personal',
    createdAt: '2024-03-05',
  },
  {
    id: 'task-7',
    title: 'Write weekly reflection',
    priority: 'medium',
    dueDate: '2024-03-17',
    isCompleted: false,
    category: 'journal',
    createdAt: '2024-03-13',
  },
];

export const MOCK_JOURNAL: JournalEntry[] = [
  {
    id: 'journal-1',
    title: 'A Productive Monday',
    content: 'Started the week strong. Read 40 pages of Atomic Habits and completed my React project setup. The habit stacking technique from the book is really helpful — I paired my morning coffee with 10 minutes of planning.\n\nKey takeaway: Small incremental changes lead to remarkable results.',
    mood: 'great',
    date: '2024-03-11',
    tags: ['productivity', 'reading'],
    createdAt: '2024-03-11',
  },
  {
    id: 'journal-2',
    title: 'Struggling with Focus',
    content: 'Had a tough time concentrating today. Kept checking my phone every few minutes. Need to implement the deep work strategies from Cal Newport. Will try scheduling a 90-minute deep work block tomorrow morning.\n\nNote to self: Remove phone from workspace.',
    mood: 'bad',
    date: '2024-03-12',
    tags: ['focus', 'struggles'],
    createdAt: '2024-03-12',
  },
  {
    id: 'journal-3',
    title: 'Weekend Learning',
    content: 'Spent Saturday learning about TypeScript advanced types. The conditional types and mapped types are powerful but complex. Built a small utility library to practice.\n\nAlso finished reading Sapiens — what an incredible journey through human history. The cognitive revolution chapter was mind-blowing.',
    mood: 'good',
    date: '2024-03-09',
    tags: ['learning', 'typescript', 'reading'],
    createdAt: '2024-03-09',
  },
  {
    id: 'journal-4',
    title: 'Grateful Sunday',
    content: 'Took a walk in the park today. The weather was perfect. Reflected on the past week and felt grateful for the progress I\'ve made. Meditated for 15 minutes — my longest session yet.\n\nThings I\'m grateful for:\n- Health and energy\n- The ability to learn new things\n- Supportive friends and family',
    mood: 'great',
    date: '2024-03-10',
    tags: ['gratitude', 'mindfulness'],
    createdAt: '2024-03-10',
  },
  {
    id: 'journal-5',
    title: 'Learning Rust Basics',
    content: 'Started learning Rust today. The ownership concept is unique but makes sense after going through the borrow checker examples. Built a simple CLI calculator as my first project.\n\nRust\'s pattern matching is incredibly powerful. Feeling excited about systems programming again.',
    mood: 'good',
    date: '2024-03-08',
    tags: ['learning', 'rust', 'programming'],
    createdAt: '2024-03-08',
  },
  {
    id: 'journal-6',
    title: 'Deep Work Session',
    content: 'Completed a 2-hour deep work session on the new API design. Used the Pomodoro technique with 50-minute focus blocks. Made significant progress on the architecture.\n\nThe key was removing all distractions — phone on silent, notifications off, and a clear goal for the session.',
    mood: 'great',
    date: '2024-03-07',
    tags: ['focus', 'productivity', 'coding'],
    createdAt: '2024-03-07',
  },
  {
    id: 'journal-7',
    title: 'Book Reflections: Atomic Habits',
    content: 'Just finished Part 2 of Atomic Habits. The concept of habit stacking is eye-opening. I\'ve started implementing: After I pour my morning coffee, I will meditate for 1 minute.\n\nThe book emphasizes identity-based habits rather than outcome-based. Instead of saying "I want to read more," say "I am a reader."',
    mood: 'good',
    date: '2024-03-06',
    tags: ['reading', 'habits', 'reflection'],
    createdAt: '2024-03-06',
  },
  {
    id: 'journal-8',
    title: 'Project Planning Session',
    content: 'Spent the evening planning the KnowledgeOS dashboard redesign. Key decisions:\n- Use bento grid layout for dashboard\n- Add micro-interactions for delight\n- Implement glassmorphism for sidebar\n\nExcited about the direction. The goal is to make it feel as polished as Linear and Notion.',
    mood: 'great',
    date: '2024-03-05',
    tags: ['planning', 'design', 'project'],
    createdAt: '2024-03-05',
  },
  {
    id: 'journal-9',
    title: 'Evening Reflection',
    content: 'Today was balanced. Worked on the project, exercised for 30 minutes, and read before bed. Feeling content with the rhythm I\'ve built.\n\nGrateful for:\n- The discipline I\'ve developed\n- Supportive team members\n- The joy of creating something meaningful',
    mood: 'great',
    date: '2024-03-04',
    tags: ['reflection', 'gratitude'],
    createdAt: '2024-03-04',
  },
  {
    id: 'journal-10',
    title: 'Overwhelmed by Tasks',
    content: 'Too many things on my plate today. Need to prioritize better. The Eisenhower matrix might help — will categorize tasks into urgent/important tonight.\n\nLesson: Saying no to non-essential tasks is a superpower.',
    mood: 'bad',
    date: '2024-03-03',
    tags: ['productivity', 'struggles'],
    createdAt: '2024-03-03',
  },
];

export const MOCK_READING_SESSIONS: ReadingSession[] = [
  {
    id: 'session-1',
    bookId: 'book-1',
    bookTitle: 'Atomic Habits',
    date: '2024-03-14',
    pagesRead: 25,
    durationMinutes: 35,
    startPage: 120,
    endPage: 145,
  },
  {
    id: 'session-2',
    bookId: 'book-1',
    bookTitle: 'Atomic Habits',
    date: '2024-03-13',
    pagesRead: 40,
    durationMinutes: 55,
    startPage: 80,
    endPage: 120,
  },
  {
    id: 'session-3',
    bookId: 'book-4',
    bookTitle: 'The Pragmatic Programmer',
    date: '2024-03-13',
    pagesRead: 30,
    durationMinutes: 45,
    startPage: 59,
    endPage: 89,
  },
  {
    id: 'session-4',
    bookId: 'book-4',
    bookTitle: 'The Pragmatic Programmer',
    date: '2024-03-12',
    pagesRead: 35,
    durationMinutes: 50,
    startPage: 24,
    endPage: 59,
  },
  {
    id: 'session-5',
    bookId: 'book-1',
    bookTitle: 'Atomic Habits',
    date: '2024-03-12',
    pagesRead: 20,
    durationMinutes: 30,
    startPage: 60,
    endPage: 80,
  },
  {
    id: 'session-6',
    bookId: 'book-7',
    bookTitle: 'The Psychology of Money',
    date: '2024-03-14',
    pagesRead: 25,
    durationMinutes: 40,
    startPage: 53,
    endPage: 78,
  },
  {
    id: 'session-7',
    bookId: 'book-7',
    bookTitle: 'The Psychology of Money',
    date: '2024-03-11',
    pagesRead: 30,
    durationMinutes: 42,
    startPage: 23,
    endPage: 53,
  },
  {
    id: 'session-8',
    bookId: 'book-1',
    bookTitle: 'Atomic Habits',
    date: '2024-03-10',
    pagesRead: 35,
    durationMinutes: 48,
    startPage: 25,
    endPage: 60,
  },
  {
    id: 'session-9',
    bookId: 'book-5',
    bookTitle: 'Sapiens',
    date: '2024-03-08',
    pagesRead: 50,
    durationMinutes: 60,
    startPage: 393,
    endPage: 443,
  },
  {
    id: 'session-10',
    bookId: 'book-1',
    bookTitle: 'Atomic Habits',
    date: '2024-03-07',
    pagesRead: 25,
    durationMinutes: 35,
    startPage: 0,
    endPage: 25,
  },
  {
    id: 'session-11',
    bookId: 'book-4',
    bookTitle: 'The Pragmatic Programmer',
    date: '2024-03-06',
    pagesRead: 24,
    durationMinutes: 38,
    startPage: 0,
    endPage: 24,
  },
  {
    id: 'session-12',
    bookId: 'book-7',
    bookTitle: 'The Psychology of Money',
    date: '2024-03-06',
    pagesRead: 23,
    durationMinutes: 35,
    startPage: 0,
    endPage: 23,
  },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Read Atomic Habits Ch 4-5',
    date: '2024-03-15',
    time: '07:00',
    type: 'reading',
    description: 'Finish chapters on habit stacking and environment design',
  },
  {
    id: 'event-2',
    title: 'CI/CD Pipeline Setup',
    date: '2024-03-18',
    time: '10:00',
    type: 'task',
    description: 'Configure GitHub Actions for automated deployment',
  },
  {
    id: 'event-3',
    title: 'Morning Exercise',
    date: '2024-03-15',
    time: '06:30',
    type: 'habit',
    description: '30 minutes of cardio',
  },
  {
    id: 'event-4',
    title: 'Q2 Planning Meeting',
    date: '2024-03-20',
    time: '14:00',
    type: 'other',
    description: 'Quarterly planning with the team',
  },
  {
    id: 'event-5',
    title: 'Meditation Session',
    date: '2024-03-15',
    time: '07:30',
    type: 'habit',
    description: '10 minutes of mindfulness',
  },
  {
    id: 'event-6',
    title: 'Review Weekly Goals',
    date: '2024-03-17',
    time: '20:00',
    type: 'goal',
    description: 'Weekly review and planning',
  },
  {
    id: 'event-7',
    title: 'Read The Pragmatic Programmer Ch 3',
    date: '2024-03-16',
    time: '07:00',
    type: 'reading',
    description: 'Chapter on software entropy',
  },
  {
    id: 'event-8',
    title: 'Journal Writing',
    date: '2024-03-15',
    time: '21:00',
    type: 'journal',
    description: 'Evening reflection and gratitude',
  },
  {
    id: 'event-9',
    title: 'TypeScript Study Session',
    date: '2024-03-19',
    time: '18:00',
    type: 'reading',
    description: 'Advanced types and patterns',
  },
  {
    id: 'event-10',
    title: 'Project Standup',
    date: '2024-03-15',
    time: '09:00',
    type: 'other',
    description: 'Daily team standup',
  },
  {
    id: 'event-11',
    title: 'Read Psychology of Money Ch 5',
    date: '2024-03-17',
    time: '07:00',
    type: 'reading',
    description: 'Chapter on compounding',
  },
  {
    id: 'event-12',
    title: 'Weekly Review',
    date: '2024-03-16',
    time: '19:00',
    type: 'goal',
    description: 'Review weekly progress and adjust goals',
  },
  {
    id: 'event-13',
    title: 'Evening Workout',
    date: '2024-03-18',
    time: '18:30',
    type: 'habit',
    description: 'Strength training session',
  },
  {
    id: 'event-14',
    title: 'Read Sapiens Ch 12',
    date: '2024-03-10',
    time: '20:00',
    type: 'reading',
    description: 'The religious revolution',
  },
  {
    id: 'event-15',
    title: 'Deep Work Block',
    date: '2024-03-19',
    time: '08:00',
    type: 'task',
    description: '90-minute focused coding session',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Reading Streak!',
    message: 'You\'ve read for 12 days straight. Keep it up!',
    type: 'achievement',
    read: false,
    createdAt: '2024-03-12T08:00:00Z',
  },
  {
    id: 'notif-2',
    title: 'Task Due Soon',
    message: '"Finish Chapter 4 of Atomic Habits" is due tomorrow.',
    type: 'warning',
    read: false,
    createdAt: '2024-03-14T18:00:00Z',
  },
  {
    id: 'notif-3',
    title: 'New Book Recommendation',
    message: 'Based on your reading history, you might enjoy "Designing Data-Intensive Applications".',
    type: 'info',
    read: true,
    createdAt: '2024-03-10T12:00:00Z',
  },
  {
    id: 'notif-4',
    title: 'Goal Completed!',
    message: 'Congratulations! You completed the "Run 5K Daily" goal.',
    type: 'success',
    read: true,
    createdAt: '2024-03-08T09:00:00Z',
  },
  {
    id: 'notif-5',
    title: 'Habit Reminder',
    message: 'Don\'t forget to write in your journal today.',
    type: 'info',
    read: false,
    createdAt: '2024-03-14T20:00:00Z',
  },
];

// ── Analytics Mock Data ──────────────────────────────────

export interface AnalyticsDataPoint {
  date: string;
  value: number;
}

export interface AnalyticsCategory {
  name: string;
  value: number;
  color: string;
}

export interface WeeklyReport {
  week: string;
  journalEntries: number;
  readingHours: number;
  tasksCompleted: number;
  focusHours: number;
}

export interface MonthlyReport {
  month: string;
  entries: number;
  booksFinished: number;
  pagesRead: number;
  avgFocusHours: number;
}

export interface AIInsight {
  id: string;
  type: 'productivity' | 'reading' | 'learning' | 'focus';
  message: string;
  trend: 'up' | 'down' | 'neutral';
  percentage?: number;
}

export const MOCK_DAILY_ACTIVITY: AnalyticsDataPoint[] = [
  { date: 'Mon', value: 4 },
  { date: 'Tue', value: 6 },
  { date: 'Wed', value: 3 },
  { date: 'Thu', value: 8 },
  { date: 'Fri', value: 5 },
  { date: 'Sat', value: 7 },
  { date: 'Sun', value: 9 },
];

export const MOCK_READING_TREND: AnalyticsDataPoint[] = [
  { date: 'Week 1', value: 120 },
  { date: 'Week 2', value: 180 },
  { date: 'Week 3', value: 145 },
  { date: 'Week 4', value: 210 },
  { date: 'Week 5', value: 165 },
  { date: 'Week 6', value: 240 },
];

export const MOCK_KNOWLEDGE_GROWTH: AnalyticsDataPoint[] = [
  { date: 'Jan', value: 12 },
  { date: 'Feb', value: 28 },
  { date: 'Mar', value: 45 },
  { date: 'Apr', value: 58 },
  { date: 'May', value: 72 },
  { date: 'Jun', value: 89 },
];

export const MOCK_FOCUS_HOURS: AnalyticsDataPoint[] = [
  { date: 'Week 1', value: 8 },
  { date: 'Week 2', value: 12 },
  { date: 'Week 3', value: 10 },
  { date: 'Week 4', value: 15 },
  { date: 'Week 5', value: 11 },
  { date: 'Week 6', value: 18 },
];

export const MOCK_CATEGORY_DISTRIBUTION: AnalyticsCategory[] = [
  { name: 'Journal', value: 35, color: 'bg-indigo-500' },
  { name: 'Reading', value: 25, color: 'bg-emerald-500' },
  { name: 'Tasks', value: 20, color: 'bg-amber-500' },
  { name: 'Learning', value: 12, color: 'bg-blue-500' },
  { name: 'Other', value: 8, color: 'bg-violet-500' },
];

export const MOCK_WEEKLY_REPORTS: WeeklyReport[] = [
  {
    week: 'Mar 4 - Mar 10',
    journalEntries: 4,
    readingHours: 5.5,
    tasksCompleted: 7,
    focusHours: 8,
  },
  {
    week: 'Feb 26 - Mar 3',
    journalEntries: 3,
    readingHours: 4.2,
    tasksCompleted: 5,
    focusHours: 6,
  },
  {
    week: 'Feb 19 - Feb 25',
    journalEntries: 5,
    readingHours: 6.8,
    tasksCompleted: 9,
    focusHours: 10,
  },
];

export const MOCK_MONTHLY_REPORTS: MonthlyReport[] = [
  {
    month: 'January',
    entries: 15,
    booksFinished: 2,
    pagesRead: 480,
    avgFocusHours: 6.5,
  },
  {
    month: 'February',
    entries: 18,
    booksFinished: 1,
    pagesRead: 520,
    avgFocusHours: 7.2,
  },
  {
    month: 'March',
    entries: 10,
    booksFinished: 1,
    pagesRead: 340,
    avgFocusHours: 8.1,
  },
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'insight-1',
    type: 'productivity',
    message: 'You are most productive between 8 PM and 10 PM. Schedule deep work during this window.',
    trend: 'up',
    percentage: 23,
  },
  {
    id: 'insight-2',
    type: 'reading',
    message: 'Reading consistency increased by 18% this month. Your morning habit is paying off.',
    trend: 'up',
    percentage: 18,
  },
  {
    id: 'insight-3',
    type: 'focus',
    message: 'Focus sessions average 42 minutes. Try 90-minute blocks for deeper work.',
    trend: 'neutral',
  },
  {
    id: 'insight-4',
    type: 'learning',
    message: 'Your journal-to-reading ratio improved. Writing about what you read boosts retention.',
    trend: 'up',
    percentage: 32,
  },
];

// ── Calendar / Schedule Mock Data ───────────────────────

export interface DayEvent {
  id: string;
  title: string;
  time: string;
  type: 'reading' | 'task' | 'habit' | 'goal' | 'journal' | 'other';
  description?: string;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  events: DayEvent[];
}

export const MOCK_DAY_SCHEDULES: DaySchedule[] = [
  {
    date: '2024-03-15',
    dayName: 'Friday',
    events: [
      {
        id: 'ev-1',
        title: 'Morning Exercise',
        time: '06:30',
        type: 'habit',
        description: '30 min cardio',
      },
      {
        id: 'ev-2',
        title: 'Read Atomic Habits Ch 4-5',
        time: '07:00',
        type: 'reading',
      },
      {
        id: 'ev-3',
        title: 'Meditation',
        time: '07:30',
        type: 'habit',
      },
      {
        id: 'ev-4',
        title: 'Team Standup',
        time: '09:00',
        type: 'other',
      },
      {
        id: 'ev-5',
        title: 'Evening Journal',
        time: '21:00',
        type: 'journal',
      },
    ],
  },
  {
    date: '2024-03-16',
    dayName: 'Saturday',
    events: [
      {
        id: 'ev-6',
        title: 'Read Pragmatic Programmer',
        time: '07:00',
        type: 'reading',
      },
      {
        id: 'ev-7',
        title: 'Weekly Review',
        time: '19:00',
        type: 'goal',
      },
    ],
  },
];
