import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layouts/MainLayout';
import ToastContainer from './components/ui/Toast';
import ScrollToTop from './components/layout/ScrollToTop';
import { LanguageProvider } from './i18n';

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
const DocsPage = lazy(() => import('./pages/docs/DocsPage').then(m => ({ default: m.DocsPage })));
const SiteMapPage = lazy(() => import('./pages/site-map/SiteMapPage').then(m => ({ default: m.SiteMapPage })));
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const NotFound = lazy(() => import('./pages/not-found/NotFound').then(m => ({ default: m.NotFound })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-7 h-7 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
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
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/site-map" element={<SiteMapPage />} />
            </Route>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
