import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star } from 'lucide-react';
import BookProgressRing from './BookProgressRing';
import type { Book } from '../../../types';

interface BookshelfCardProps {
  book: Book;
  index?: number;
  onClick?: () => void;
}

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
  reading: { label: 'Reading', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  completed: { label: 'Completed', dot: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  paused: { label: 'Paused', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  wishlist: { label: 'Wishlist', dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' },
  dropped: { label: 'Dropped', dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' },
};

const BookshelfCard: React.FC<BookshelfCardProps> = ({ book, index = 0, onClick }) => {
  const progress = book.totalPages > 0 ? Math.round((book.currentPage / book.totalPages) * 100) : 0;
  const config = statusConfig[book.status] ?? { label: book.status, dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] as const }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-lg dark:hover:shadow-slate-900/60 transition-all duration-300 cursor-pointer"
    >
      <div className="flex gap-4">
        {/* Cover */}
        <div className="w-16 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <BookOpen size={20} className="text-slate-300 dark:text-slate-600" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{config.label}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {book.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{book.author}</p>
            </div>
            <BookProgressRing progress={progress} size={48} strokeWidth={3} />
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {book.category}
            </span>
            {book.rating && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                {book.rating}/5
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookshelfCard;
