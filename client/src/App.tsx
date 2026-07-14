import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout';
import ToastContainer from './components/ui/Toast';
import ScrollToTop from './components/layout/ScrollToTop';

const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard').then(m => ({ default: m.Dashboard })));
const Library = lazy(() => import('./pages/library/Library').then(m => ({ default: m.Library })));
const Notes = lazy(() => import('./pages/notes/Notes').then(m => ({ default: m.Notes })));
const Goals = lazy(() => import('./pages/goals/Goals').then(m => ({ default: m.Goals })));
const Habits = lazy(() => import('./pages/habits/Habits').then(m => ({ default: m.Habits })));
const Tasks = lazy(() => import('./pages/tasks/Tasks').then(m => ({ default: m.Tasks })));
const Journal = lazy(() => import('./pages/journal/Journal').then(m => ({ default: m.Journal })));
const ReadingTracker = lazy(() => import('./pages/reading/ReadingTracker').then(m => ({ default: m.ReadingTracker })));
const Analytics = lazy(() => import('./pages/analytics/Analytics').then(m => ({ default: m.Analytics })));
const CalendarPage = lazy(() => import('./pages/calendar/Calendar').then(m => ({ default: m.CalendarPage })));
const Profile = lazy(() => import('./pages/profile/Profile').then(m => ({ default: m.Profile })));
const SettingsPage = lazy(() => import('./pages/settings/Settings').then(m => ({ default: m.SettingsPage })));
const Search = lazy(() => import('./pages/search/Search').then(m => ({ default: m.Search })));
const Notifications = lazy(() => import('./pages/notifications/Notifications').then(m => ({ default: m.Notifications })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-7 h-7 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-slate-500 animate-pulse">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/library" element={<Library />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/reading" element={<ReadingTracker />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notifications" element={<Notifications />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
