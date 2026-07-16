export interface TimelineEntry {
  id: string;
  date: string;
  time?: string;
  type: 'study' | 'reading' | 'journal' | 'meeting' | 'goal' | 'habit' | 'task' | 'reminder' | 'milestone' | 'achievement' | 'ai-session';
  title: string;
  description?: string;
  isCompleted?: boolean;
  badge?: 'today' | 'tomorrow' | 'missed' | 'completed' | 'important' | 'new' | 'upcoming';
}

export interface TimelineMilestone {
  id: string;
  icon: string;
  label: string;
  description: string;
  date: string;
  achieved: boolean;
}

export interface DailySummaryData {
  date: string;
  tasksCompleted: number;
  tasksTotal: number;
  pagesRead: number;
  readingMinutes: number;
  journalEntries: number;
  goalsCompleted: number;
  habitsCompleted: number;
  habitsTotal: number;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  focusMinutes: number;
}

export interface AchievementMilestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
  achievedDate?: string;
  progress: number;
}

export interface TimelineInsight {
  id: string;
  message: string;
  icon: string;
}

export interface ProductivityScoreData {
  overall: number;
  reading: number;
  journal: number;
  tasks: number;
  goals: number;
  habits: number;
  calendar: number;
}

export interface CalendarSuggestion {
  id: string;
  type: 'reading' | 'focus' | 'break' | 'journal' | 'planning';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface HeatmapDay {
  date: string;
  count: number;
}

export interface CalendarMood {
  date: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
}

export interface WeeklyReviewData {
  weekStart: string;
  label: string;
  focusHours: number;
  goalProgress: number;
  habitProgress: number;
  knowledgeGrowth: number;
  readingSummary: string;
  journalSummary: string;
}

export interface MonthlyReviewData {
  month: string;
  label: string;
  booksFinished: number;
  tasksCompleted: number;
  journalCount: number;
  studyHours: number;
  consistency: number;
  productivityScore: number;
}

export interface YearlyReviewData {
  year: number;
  achievements: string[];
  milestones: { icon: string; label: string; date: string }[];
  growthTimeline: { month: string; value: number }[];
}

export const USER_CREATION_DATE = '2024-01-10';

const today = new Date();
const todayStr = today.toISOString().split('T')[0]!;
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0]!;

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0]!;
}

function generateHeatmap(): HeatmapDay[] {
  return Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    return { date: formatDate(d), count: Math.floor(Math.random() * 8) };
  });
}

function generateSummaries(): DailySummaryData[] {
  const moods: DailySummaryData['mood'][] = ['great', 'good', 'good', 'neutral', 'good', 'great', 'neutral'];
  return Array.from({ length: 90 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    return {
      date: formatDate(d),
      tasksCompleted: Math.floor(Math.random() * 6),
      tasksTotal: 8,
      pagesRead: Math.floor(Math.random() * 50),
      readingMinutes: Math.floor(Math.random() * 60),
      journalEntries: Math.random() > 0.5 ? 1 : 0,
      goalsCompleted: Math.floor(Math.random() * 2),
      habitsCompleted: Math.floor(Math.random() * 4),
      habitsTotal: 5,
      mood: moods[Math.floor(Math.random() * moods.length)]!,
      focusMinutes: Math.floor(Math.random() * 120),
    };
  });
}

function generateTimelineEntries(): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    { id: 'tl-1', date: '2024-01-10', time: '09:00', type: 'reading', title: 'Started reading Atomic Habits', description: 'Read first 25 pages', isCompleted: true },
    { id: 'tl-2', date: '2024-01-11', time: '20:00', type: 'journal', title: 'First journal reflection', isCompleted: true },
    { id: 'tl-3', date: '2024-01-15', time: '10:00', type: 'goal', title: 'Created first goal: Read 24 books in 2024', isCompleted: true },
    { id: 'tl-4', date: todayStr, type: 'task', title: 'Review pull requests', isCompleted: false, badge: 'today' },
    { id: 'tl-5', date: todayStr, type: 'habit', title: 'Morning exercise', isCompleted: true, badge: 'today' },
  ];
  if (todayStr !== '2024-01-10') {
    entries.push({ id: 'tl-today', date: todayStr, type: 'reading', title: 'Read Atomic Habits Ch 6', isCompleted: false, badge: 'new' });
  }
  return entries;
}

const firstEntryDate = new Date('2024-01-10');
const firstMilestones: TimelineMilestone[] = [
  { id: 'fe-1', icon: '✅', label: 'First Login', description: 'Logged into KnowledgeOS for the first time', date: '2024-01-10', achieved: true },
  { id: 'fe-2', icon: '📖', label: 'First Book Added', description: 'Added Atomic Habits to your library', date: '2024-01-10', achieved: true },
  { id: 'fe-3', icon: '📝', label: 'First Journal', description: 'Wrote your first journal entry', date: '2024-01-11', achieved: true },
];

const achievements: AchievementMilestone[] = [
  { id: 'ach-1', title: '7-Day Streak', description: 'Maintained a 7-day learning streak', icon: '🔥', achieved: true, achievedDate: '2024-01-17', progress: 100 },
  { id: 'ach-2', title: '100 Notes', description: 'Created 100 knowledge notes', icon: '📝', achieved: false, progress: 64 },
  { id: 'ach-3', title: '10 Books', description: 'Added 10 books to your library', icon: '📚', achieved: false, progress: 70 },
];

const productivityScore: ProductivityScoreData = {
  overall: 78, reading: 82, journal: 65, tasks: 88, goals: 71, habits: 74, calendar: 69,
};

const timelineInsights: TimelineInsight[] = [
  { id: 'ti-1', message: 'You read more on Mondays than any other day.', icon: '📖' },
  { id: 'ti-2', message: 'Your best focus time is 8 PM – 10 PM.', icon: '⏰' },
  { id: 'ti-3', message: 'Wednesday is your strongest learning day.', icon: '🧠' },
];

const suggestions: CalendarSuggestion[] = [
  { id: 'cs-1', type: 'reading', message: 'No reading session scheduled tomorrow. Add one to maintain your 12-day streak.', priority: 'high' },
  { id: 'cs-2', type: 'focus', message: 'Best focus window today: 8 PM – 10 PM. Schedule deep work then.', priority: 'medium' },
  { id: 'cs-3', type: 'journal', message: "You haven't journaled today. Evening reflection helps retention.", priority: 'low' },
];

const moods: CalendarMood[] = [
  { date: formatDate(new Date(today.getTime() - 0 * 86400000)), mood: 'great' },
  { date: formatDate(new Date(today.getTime() - 1 * 86400000)), mood: 'good' },
  { date: formatDate(new Date(today.getTime() - 2 * 86400000)), mood: 'neutral' },
];

const weeklyReviews: WeeklyReviewData[] = [
  { weekStart: formatDate(new Date(today.getTime() - today.getDay() * 86400000)), label: 'This Week', focusHours: 14, goalProgress: 65, habitProgress: 72, knowledgeGrowth: 8, readingSummary: 'Read 3 chapters across 2 books', journalSummary: '4 journal entries this week' },
  { weekStart: formatDate(new Date(today.getTime() - (today.getDay() + 7) * 86400000)), label: 'Last Week', focusHours: 12, goalProgress: 58, habitProgress: 68, knowledgeGrowth: 6, readingSummary: 'Read 2 chapters', journalSummary: '3 journal entries' },
];

const monthlyReviews: MonthlyReviewData[] = [
  { month: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)), label: 'This Month', booksFinished: 2, tasksCompleted: 28, journalCount: 12, studyHours: 18, consistency: 74, productivityScore: 76 },
  { month: formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)), label: 'Last Month', booksFinished: 1, tasksCompleted: 22, journalCount: 10, studyHours: 15, consistency: 68, productivityScore: 71 },
];

const currentYear = today.getFullYear();
const yearlyReview: YearlyReviewData = {
  year: currentYear,
  achievements: ['Completed 12 books', '100-day streak achieved', 'Created 200+ notes'],
  milestones: [
    { icon: '📖', label: 'First Book Finished', date: 'Feb 2024' },
    { icon: '🔥', label: '30-Day Streak', date: 'Mar 2024' },
    { icon: '📝', label: '100th Note Created', date: 'Jun 2024' },
  ],
  growthTimeline: [
    { month: 'Jan', value: 40 }, { month: 'Feb', value: 65 }, { month: 'Mar', value: 85 },
    { month: 'Apr', value: 70 }, { month: 'May', value: 95 }, { month: 'Jun', value: 110 },
    { month: 'Jul', value: 130 }, { month: 'Aug', value: 145 }, { month: 'Sep', value: 160 },
    { month: 'Oct', value: 180 }, { month: 'Nov', value: 200 }, { month: 'Dec', value: 230 },
  ],
};

export const calendarData = {
  async getTimelineEntries() { return { data: generateTimelineEntries() }; },
  async getFirstEventMilestones() { return { data: firstMilestones }; },
  async getAchievementMilestones() { return { data: achievements }; },
  async getDailySummaries() { return { data: generateSummaries() }; },
  async getWeeklyReviews() { return { data: weeklyReviews }; },
  async getMonthlyReviews() { return { data: monthlyReviews }; },
  async getYearlyReview() { return { data: yearlyReview }; },
  async getProductivityScore() { return { data: productivityScore }; },
  async getTimelineInsights() { return { data: timelineInsights }; },
  async getCalendarSuggestions() { return { data: suggestions }; },
  async getHeatmapData() { return { data: generateHeatmap() }; },
  async getCalendarMoods() { return { data: moods }; },
};
