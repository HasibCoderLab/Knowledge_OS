import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Plus } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import BookCard from '../../features/library/components/BookCard';
import LibraryFilters from '../../features/library/components/LibraryFilters';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';
import type { Book } from '../../types';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'reading', label: 'Reading' },
  { value: 'completed', label: 'Completed' },
  { value: 'wishlist', label: 'Wishlist' },
  { value: 'dropped', label: 'Dropped' },
];

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Library</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your personal book collection</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="aspect-[3/4] w-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <Skeleton height={16} className="w-3/4" />
                <Skeleton height={12} className="w-1/2" />
                <Skeleton height={8} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Library</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your personal book collection</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus size={16} /> Add Book
        </Button>
      </header>

      <LibraryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterOptions={filterOptionsWithCounts}
      />

      {filteredBooks.length === 0 ? (
        searchQuery ? (
          <EmptyState icon={BookOpen} title="No books found" description="Try a different search term" />
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No books found"
            description="Add your first book to get started"
            actionLabel="Add Book"
            onAction={() => {}}
          />
        )
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      )}

      {selectedBook && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBook(null)}
          title={selectedBook.title}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-32 shrink-0">
                <img
                  src={selectedBook.coverUrl}
                  alt={selectedBook.title}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-500 dark:text-slate-400">by {selectedBook.author}</p>
                <p className="text-xs text-slate-400 mt-1">{selectedBook.category}</p>
                <p className="text-xs text-slate-400 mt-1">{selectedBook.totalPages} pages</p>
                {selectedBook.rating && (
                  <p className="text-xs text-amber-600 mt-1">Rating: {selectedBook.rating}/5</p>
                )}
                {selectedBook.tags && selectedBook.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedBook.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedBook.status === 'reading' && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Reading Progress</h4>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>Page {selectedBook.currentPage} of {selectedBook.totalPages}</span>
                  <span>{Math.round((selectedBook.currentPage / selectedBook.totalPages) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${(selectedBook.currentPage / selectedBook.totalPages) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
