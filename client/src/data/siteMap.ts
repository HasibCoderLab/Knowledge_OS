import {
  LayoutDashboard, BookOpen, FileText, Target, CheckSquare, ListChecks,
  BookMarked, BarChart3, Calendar, Search, Bell, Settings, User,
  Library, type LucideIcon,
} from 'lucide-react';

export type FeatureStatus = 'available' | 'beta' | 'upcoming' | 'planned';

export interface SiteNode {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
  status: FeatureStatus;
  description: string;
  children?: SiteNode[];
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: FeatureStatus;
  color: string;
  category: string;
}

export interface DependencyLink {
  from: string;
  to: string;
  label: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  color: string;
}

export interface QuickStartStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export const siteHierarchy: SiteNode[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    status: 'available',
    description: 'Personal dashboard with stats, reading progress, and habit checklist',
    children: [
      {
        id: 'stats',
        label: 'Statistics Overview',
        icon: BarChart3,
        path: '/dashboard',
        status: 'available',
        description: 'Books read, active goals, habit completion rates',
      },
    ],
  },
  {
    id: 'knowledge',
    label: 'Knowledge Management',
    icon: Library,
    status: 'available',
    description: 'Core knowledge organization modules',
    children: [
      {
        id: 'library',
        label: 'Library',
        icon: BookOpen,
        path: '/library',
        status: 'available',
        description: 'Organize books, references, and bookmarks',
      },
      {
        id: 'notes',
        label: 'Notes',
        icon: FileText,
        path: '/notes',
        status: 'available',
        description: 'Capture ideas with distraction-free editor',
      },
      {
        id: 'reading',
        label: 'Reading Tracker',
        icon: BookMarked,
        path: '/reading',
        status: 'available',
        description: 'Log books, track pages, reading velocity',
      },
      {
        id: 'journal',
        label: 'Journal',
        icon: BookMarked,
        path: '/journal',
        status: 'available',
        description: 'Daily reflections and weekly reviews',
      },
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: Target,
    status: 'available',
    description: 'Goals, habits, tasks, and deep work',
    children: [
      {
        id: 'goals',
        label: 'Goals',
        icon: Target,
        path: '/goals',
        status: 'available',
        description: 'Strategic goals with milestones and progress',
      },
      {
        id: 'habits',
        label: 'Habits',
        icon: CheckSquare,
        path: '/habits',
        status: 'available',
        description: 'Daily habit tracking with streaks',
      },
      {
        id: 'tasks',
        label: 'Tasks',
        icon: ListChecks,
        path: '/tasks',
        status: 'available',
        description: 'Task management with priorities and filters',
      },
      {
        id: 'deep-work',
        label: 'Deep Work',
        icon: ListChecks,
        path: '/tasks',
        status: 'beta',
        description: 'Focus sessions with Pomodoro timer',
      },
    ],
  },
  {
    id: 'insights',
    label: 'Insights & Analytics',
    icon: BarChart3,
    status: 'available',
    description: 'Data visualization and planning tools',
    children: [
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        path: '/analytics',
        status: 'available',
        description: 'Visual dashboards for productivity trends',
      },
      {
        id: 'calendar',
        label: 'Calendar',
        icon: Calendar,
        path: '/calendar',
        status: 'available',
        description: 'Unified view of tasks and events',
      },
    ],
  },
  {
    id: 'system',
    label: 'System',
    icon: Settings,
    status: 'available',
    description: 'Platform tools and configuration',
    children: [
      {
        id: 'search',
        label: 'Search',
        icon: Search,
        path: '/search',
        status: 'available',
        description: 'Global full-text search across all modules',
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: Bell,
        path: '/notifications',
        status: 'available',
        description: 'Smart reminders for goals and habits',
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: User,
        path: '/profile',
        status: 'available',
        description: 'Personal stats, streaks, and progress',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        path: '/settings',
        status: 'available',
        description: 'Themes, preferences, and workspace config',
      },
    ],
  },
  {
    id: 'docs',
    label: 'Documentation',
    icon: FileText,
    path: '/docs',
    status: 'available',
    description: 'Documentation center with guides and references',
  },
  {
    id: 'site-map',
    label: 'Site Map',
    icon: LayoutDashboard,
    path: '/site-map',
    status: 'available',
    description: 'Interactive site overview with navigation flow',
  },
];

export const featureCards: FeatureCard[] = [
  { id: 'library', title: 'Library', description: 'Organize books and references', icon: Library, status: 'available', color: 'indigo', category: 'knowledge' },
  { id: 'notes', title: 'Notes', description: 'Capture ideas at speed of thought', icon: FileText, status: 'available', color: 'emerald', category: 'knowledge' },
  { id: 'goals', title: 'Goals', description: 'Strategic targets with milestones', icon: Target, status: 'available', color: 'violet', category: 'productivity' },
  { id: 'habits', title: 'Habits', description: 'Build routines with streak tracking', icon: CheckSquare, status: 'available', color: 'orange', category: 'productivity' },
  { id: 'tasks', title: 'Tasks', description: 'Full task management system', icon: ListChecks, status: 'available', color: 'blue', category: 'productivity' },
  { id: 'journal', title: 'Journal', description: 'Daily reflections and reviews', icon: BookMarked, status: 'available', color: 'rose', category: 'knowledge' },
  { id: 'reading', title: 'Reading Tracker', description: 'Log sessions and track velocity', icon: BookOpen, status: 'available', color: 'cyan', category: 'knowledge' },
  { id: 'analytics', title: 'Analytics', description: 'Productivity insights and charts', icon: BarChart3, status: 'available', color: 'amber', category: 'insights' },
  { id: 'calendar', title: 'Calendar', description: 'Unified scheduling view', icon: Calendar, status: 'available', color: 'pink', category: 'insights' },
  { id: 'deep-work', title: 'Deep Work', description: 'Pomodoro focus sessions', icon: Target, status: 'beta', color: 'indigo', category: 'productivity' },
  { id: 'ai-workspace', title: 'AI Workspace', description: 'AI assistant integration', icon: BarChart3, status: 'upcoming', color: 'violet', category: 'ai' },
  { id: 'knowledge-graph', title: 'Knowledge Graph', description: 'Graph-based knowledge representation', icon: BookOpen, status: 'planned', color: 'emerald', category: 'ai' },
];

export const dependencyLinks: DependencyLink[] = [
  { from: 'notes', to: 'library', label: 'references books' },
  { from: 'goals', to: 'tasks', label: 'breaks into tasks' },
  { from: 'goals', to: 'habits', label: 'supported by habits' },
  { from: 'tasks', to: 'calendar', label: 'scheduled on' },
  { from: 'journal', to: 'analytics', label: 'feeds mood data' },
  { from: 'reading', to: 'library', label: 'logs from' },
  { from: 'reading', to: 'analytics', label: 'feeds velocity data' },
  { from: 'habits', to: 'analytics', label: 'feeds completion data' },
  { from: 'library', to: 'notes', label: 'annotated via' },
  { from: 'analytics', to: 'dashboard', label: 'displays on' },
];

export const workflowSteps: WorkflowStep[] = [
  { id: 'morning', title: 'Morning Review', description: 'Review goals, check habits, plan day', icon: Target, duration: '10 min', color: 'indigo' },
  { id: 'reading', title: 'Reading Session', description: 'Log reading progress, take notes', icon: BookOpen, duration: '30 min', color: 'emerald' },
  { id: 'deep-work', title: 'Deep Work Session', description: 'Focused task execution with timer', icon: ListChecks, duration: '90 min', color: 'violet' },
  { id: 'journal', title: 'Evening Reflection', description: 'Journal entries and daily review', icon: BookMarked, duration: '10 min', color: 'amber' },
  { id: 'weekly', title: 'Weekly Review', description: 'Analytics review, goal adjustments', icon: BarChart3, duration: '20 min', color: 'blue' },
];

export const quickStartSteps: QuickStartStep[] = [
  { id: 1, title: 'Create Your Account', description: 'Sign up and set up your profile', icon: User, path: '/auth/register' },
  { id: 2, title: 'Explore Dashboard', description: 'Get an overview of your workspace', icon: LayoutDashboard, path: '/dashboard' },
  { id: 3, title: 'Add Your First Book', description: 'Start building your library', icon: BookOpen, path: '/library' },
  { id: 4, title: 'Write a Note', description: 'Capture your first idea', icon: FileText, path: '/notes' },
  { id: 5, title: 'Set a Goal', description: 'Define your first milestone', icon: Target, path: '/goals' },
  { id: 6, title: 'Create a Habit', description: 'Build your first routine', icon: CheckSquare, path: '/habits' },
  { id: 7, title: 'Log a Task', description: 'Organize your to-dos', icon: ListChecks, path: '/tasks' },
  { id: 8, title: 'Write a Journal Entry', description: 'Reflect on your day', icon: BookMarked, path: '/journal' },
];

export const versionHistory = [
  { version: 'v1.2.0', date: '2026-07-10', features: ['Documentation Center', 'Site Map', 'Global Search', 'Keyboard Shortcuts'] },
  { version: 'v1.1.0', date: '2026-06-15', features: ['Notifications', 'Profile Page', 'Calendar', 'Deep Work (Beta)'] },
  { version: 'v1.0.0', date: '2026-05-01', features: ['Frontend MVP', 'Library', 'Notes', 'Goals', 'Habits', 'Tasks', 'Journal', 'Analytics'] },
];

export const whatsNewEntries = [
  { date: '2026-07-10', title: 'Documentation Center Launched', description: 'New /docs page with search, filters, categories, and quick links. Everything you need to get started.', tag: 'new' },
  { date: '2026-07-10', title: 'Interactive Site Map', description: 'Explore KnowledgeOS visually with the new /site-map page. Tree view, navigation flow, and feature dependencies.', tag: 'new' },
  { date: '2026-07-05', title: 'Global Search Improvements', description: 'Full-text search across all modules with category filters and keyboard shortcut ⌘K.', tag: 'improvement' },
  { date: '2026-06-28', title: 'Bengali Translations Complete', description: 'All modules now available in Bengali. Switch in Settings → Language.', tag: 'improvement' },
  { date: '2026-06-15', title: 'Notification System', description: 'Smart reminders for goals, habits, and reading targets. Configurable in Settings.', tag: 'feature' },
];
