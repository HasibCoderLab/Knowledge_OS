import React from 'react';
import { BookOpen, Star, Clock, ChevronRight } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import type { Book } from '../../../types';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const statusConfig = {
  reading: { label: 'Reading', variant: 'info' as const },
  completed: { label: 'Completed', variant: 'success' as const },
  wishlist: { label: 'Wishlist', variant: 'warning' as const },
  dropped: { label: 'Dropped', variant: 'danger' as const },
};

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const progress = book.totalPages > 0 ? Math.round((book.currentPage / book.totalPages) * 100) : 0;
  const config = statusConfig[book.status as keyof typeof statusConfig];

  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 cursor-pointer"
    >
      <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen size={40} className="text-slate-300 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
        {book.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-amber-600">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {book.rating}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-1">
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{book.author}</p>

        {book.status === 'reading' && (
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span className="flex items-center gap-1">
                <Clock size={11} /> {progress}%
              </span>
              <span>p.{book.currentPage}/{book.totalPages}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700 group-hover:bg-indigo-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {book.status === 'completed' && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <Star size={12} />
            Completed
          </div>
        )}

        {book.status === 'wishlist' && (
          <div className="text-xs text-slate-400">
            {book.totalPages} pages
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-slate-400">{book.category}</span>
          <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
