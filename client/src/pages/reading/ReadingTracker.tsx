import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookOpen, Plus, TrendingUp, Target } from 'lucide-react';
import { libraryApi, readingApi } from '../../services/api/index';
import ReadingStats from '../../features/reading/components/ReadingStats';
import BookshelfCard from '../../features/reading/components/BookshelfCard';
import BookProgressRing from '../../features/reading/components/BookProgressRing';
import LibraryFilters from '../../features/library/components/LibraryFilters';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';
import Modal from '../../components/ui/Modal';
import BookForm from '../../features/library/components/BookForm';
import ReadingSessionForm from '../../features/reading/components/ReadingSessionForm';
import type { Book, ReadingSession } from '../../types';
import { useToastStore } from '../../store/toastStore';
import type { BookFormData } from '../../features/library/components/BookForm';
import type { ReadingSessionFormData } from '../../features/reading/components/ReadingSessionForm';

const filterOptions = [
  { value: 'all', label: 'All Books' },
  { value: 'reading', label: 'Reading' },
  { value: 'completed', label: 'Completed' },
  { value: 'paused', label: 'Paused' },
  { value: 'wishlist', label: 'Wishlist' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export const ReadingTracker: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSessionSaving, setIsSessionSaving] = useState(false);

  const invalidate = useCallback((keys: string[][]) => {
    keys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
  }, [queryClient]);

  const { data: booksData, isLoading: booksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => libraryApi.getAll({ limit: 100 }),
  });

  const { data: sessionsData, isLoading: sessionsLoading } = useQuery({
    queryKey: ['readingSessions'],
    queryFn: () => readingApi.getAll({ limit: 100 }),
  });

  const books: Book[] = booksData?.data ?? [];
  const sessions: ReadingSession[] = sessionsData?.data ?? [];

  const stats = useMemo(() => {
    const completed = books.filter(b => b.status === 'completed').length;
    const totalPagesRead = sessions.reduce((sum, s) => sum + s.pagesRead, 0);
    const todayStr = new Date().toISOString().split('T')[0]!;
    const pagesToday = sessions
      .filter(s => s.date === todayStr)
      .reduce((sum, s) => sum + s.pagesRead, 0);
    const readingProgress = books.reduce((max, b) => {
      if (b.status === 'reading') return Math.max(max, Math.round((b.currentPage / b.totalPages) * 100));
      return max;
    }, 0);
    return { completed, totalPagesRead, pagesToday, streak: readingProgress };
  }, [books, sessions]);

  const filteredBooks = useMemo(() => {
    let result = books;
    if (activeFilter !== 'all') {
      result = result.filter(b => b.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    return result;
  }, [books, activeFilter, searchQuery]);

  const filterOptionsWithCounts = useMemo(() => {
    const all = books.length;
    const reading = books.filter(b => b.status === 'reading').length;
    const completed = books.filter(b => b.status === 'completed').length;
    const paused = books.filter(b => b.status === 'paused').length;
    const wishlist = books.filter(b => b.status === 'wishlist').length;
    return filterOptions.map(opt => ({
      ...opt,
      count: opt.value === 'all' ? all : opt.value === 'reading' ? reading : opt.value === 'completed' ? completed : opt.value === 'paused' ? paused : wishlist,
    }));
  }, [books]);

  const isLoading = booksLoading || sessionsLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-2" />
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-11 w-full max-w-md rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
            <Skeleton className="h-9 w-20 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-4">
              <Skeleton className="w-16 h-24 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="pt-4 space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-1 w-full rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
      <motion.header
        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } } }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">Reading Dashboard</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Reading Tracker</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{stats.totalPagesRead.toLocaleString()} total pages read</p>
        </div>
        <Button size="sm" className="gap-2 shrink-0" onClick={() => setIsSessionModalOpen(true)}><Plus size={16} /> Log Session</Button>
      </motion.header>

      <ReadingStats totalBooks={books.length} completedBooks={stats.completed} readingStreak={stats.streak} pagesToday={stats.pagesToday} />

      <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.08 } } }}>
        <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20"><Target size={22} className="text-indigo-600 dark:text-indigo-400" strokeWidth={2} /></div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Reading Goal</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{stats.totalPagesRead.toLocaleString()} / 1,200 pages</p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-4">
            <BookProgressRing progress={Math.min(100, Math.round((stats.totalPagesRead / 1200) * 100))} size={56} strokeWidth={4} />
            <div className="text-right">
              <p className="text-xs text-slate-400 dark:text-slate-500">{Math.max(0, 1200 - stats.totalPagesRead).toLocaleString()} pages remaining</p>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5"><TrendingUp size={12} /> On track</div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1, ease: 'easeOut' as const } } }}>
        <LibraryFilters
          searchQuery={searchQuery} onSearchChange={setSearchQuery}
          activeFilter={activeFilter} onFilterChange={setActiveFilter}
          filterOptions={filterOptionsWithCounts}
        />
      </motion.div>

      {filteredBooks.length === 0 ? (
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
          {searchQuery || activeFilter !== 'all' ? (
            <EmptyState icon={BookOpen} title="No books found" description="Try a different search or filter" />
          ) : (
            <EmptyState icon={BookOpen} title="No books in your library" description="Add your first book to start tracking reading progress" actionLabel="Add Book" onAction={() => setIsAddModalOpen(true)} />
          )}
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredBooks.map((book, index) => (
            <BookshelfCard key={book.id} book={book} index={index} onClick={() => {}} />
          ))}
        </motion.div>
      )}

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Book" size="md">
        <BookForm
          onSave={async (data: BookFormData) => {
            setIsSaving(true);
            try {
              await libraryApi.create({
                title: data.title,
                author: data.author,
                category: data.category,
                coverUrl: data.coverUrl,
                status: data.status,
                totalPages: data.totalPages,
                currentPage: data.currentPage,
                startDate: data.startDate,
                finishDate: data.finishDate,
                rating: data.rating,
                tags: data.tags,
              });
              useToastStore.getState().addToast({ title: 'Book added', type: 'success' });
              setIsAddModalOpen(false);
              invalidate([['books']]);
            } catch {
              useToastStore.getState().addToast({ title: 'Failed to add book', description: 'Please try again', type: 'error' });
            } finally {
              setIsSaving(false);
            }
          }}
          onCancel={() => setIsAddModalOpen(false)}
          isSaving={isSaving}
        />
      </Modal>

      <Modal isOpen={isSessionModalOpen} onClose={() => setIsSessionModalOpen(false)} title="Log Reading Session" size="md">
        <ReadingSessionForm
          books={books}
          onSave={async (data: ReadingSessionFormData) => {
            setIsSessionSaving(true);
            try {
              await readingApi.create({
                bookId: data.bookId,
                date: data.date,
                pagesRead: data.pagesRead,
                durationMinutes: data.durationMinutes,
                startPage: data.startPage,
                endPage: data.endPage,
              });
              useToastStore.getState().addToast({ title: 'Reading session logged', type: 'success' });
              setIsSessionModalOpen(false);
              invalidate([['readingSessions'], ['books']]);
            } catch {
              useToastStore.getState().addToast({ title: 'Failed to log session', description: 'Please try again', type: 'error' });
            } finally {
              setIsSessionSaving(false);
            }
          }}
          onCancel={() => setIsSessionModalOpen(false)}
          isSaving={isSessionSaving}
        />
      </Modal>
    </motion.div>
  );
};
