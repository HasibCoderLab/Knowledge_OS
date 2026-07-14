import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Star, Clock } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import BookCard from '../../features/library/components/BookCard';
import LibraryFilters from '../../features/library/components/LibraryFilters';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';
import Badge from '../../components/ui/Badge';
import type { Book } from '../../types';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'reading', label: 'Reading' },
  { value: 'completed', label: 'Completed' },
  { value: 'wishlist', label: 'Wishlist' },
  { value: 'dropped', label: 'Dropped' },
];

const statusBadgeConfig = {
  reading: { label: 'Reading', variant: 'info' as const },
  completed: { label: 'Completed', variant: 'success' as const },
  wishlist: { label: 'Wishlist', variant: 'warning' as const },
  dropped: { label: 'Dropped', variant: 'danger' as const },
};

export const Library: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: mockApi.getBooks,
  });

  const books = data?.data ?? [];

  const filteredBooks = useMemo(() => {
    let result = books;

    if (activeFilter !== 'all') {
      result = result.filter((b) => b.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query)
      );
    }

    return result;
  }, [books, activeFilter, searchQuery]);

  const counts = useMemo(() => {
    const all = books.length;
    const reading = books.filter((b) => b.status === 'reading').length;
    const completed = books.filter((b) => b.status === 'completed').length;
    const wishlist = books.filter((b) => b.status === 'wishlist').length;
    const dropped = books.filter((b) => b.status === 'dropped').length;
    return { all, reading, completed, wishlist, dropped };
  }, [books]);

  const filterOptionsWithCounts = filterOptions.map((opt) => ({
    ...opt,
    count: counts[opt.value as keyof typeof counts],
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-2" />
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-4">
          <div className="w-full max-w-md h-11 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          <div className="flex gap-2">
            <div className="h-9 w-16 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-28 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="aspect-[3/4] w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="pt-3 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-1.5 w-full rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.header
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
        }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
            Your Collection
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Library
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            {books.length} {books.length === 1 ? 'book' : 'books'} in your library
          </p>
        </div>
        <Button size="sm" className="gap-2 shrink-0">
          <Plus size={16} /> Add Book
        </Button>
      </motion.header>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: -8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.1, ease: 'easeOut' } },
        }}
      >
        <LibraryFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filterOptions={filterOptionsWithCounts}
        />
      </motion.div>

      {filteredBooks.length === 0 ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
        >
          {searchQuery ? (
            <EmptyState icon={BookOpen} title="No books found" description="Try a different search term" />
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No books found"
              description="Add your first book to get started"
              actionLabel="Add Book"
              onAction={() => {}}
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6"
        >
          {filteredBooks.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => setSelectedBook(book)}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {(() => {
        const book = selectedBook;
        if (!book) return null;
        return (
          <Modal
            isOpen={true}
            onClose={() => setSelectedBook(null)}
            title={book.title}
            size="lg"
          >
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-40 shrink-0">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen size={32} className="text-slate-300 dark:text-slate-600" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">by {book.author}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{book.category}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={statusBadgeConfig[book.status as keyof typeof statusBadgeConfig].variant}>
                      {statusBadgeConfig[book.status as keyof typeof statusBadgeConfig].label}
                    </Badge>
                    {book.rating && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {book.rating}/5
                      </div>
                    )}
                  </div>

                  {book.tags && book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {book.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-medium text-slate-500 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-800" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    Pages
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {book.totalPages}
                  </p>
                </div>
                {book.startDate && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                      Started
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {book.startDate}
                    </p>
                  </div>
                )}
                {book.finishDate && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                      Finished
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {book.finishDate}
                    </p>
                  </div>
                )}
              </div>

              {book.status === 'reading' && (
                <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Clock size={14} className="text-indigo-500" />
                    Reading Progress
                  </h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Page {book.currentPage} of {book.totalPages}
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {Math.round((book.currentPage / book.totalPages) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                  {book.currentPage > 0 && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                      {book.totalPages - book.currentPage} pages remaining
                    </p>
                  )}
                </div>
              )}
            </div>
          </Modal>
        );
      })()}
    </motion.div>
  );
};
