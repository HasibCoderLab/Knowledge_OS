import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Clock } from 'lucide-react';
import type { Book } from '../../../types';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  index?: number;
}

const statusConfig = {
  reading: { label: 'Reading', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  completed: { label: 'Completed', dot: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  paused: { label: 'Paused', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  wishlist: { label: 'Wishlist', dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' },
  dropped: { label: 'Dropped', dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400' },
};

const BookCard: React.FC<BookCardProps> = ({ book, onClick, index = 0 }) => {
  const progress = book.totalPages > 0 ? Math.round((book.currentPage / book.totalPages) * 100) : 0;
  const config = statusConfig[book.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] as const }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' as const } }}
      onClick={onClick}
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden cursor-pointer h-full shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/60 transition-shadow duration-300"
    >
      <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen size={40} className="text-slate-300 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${config.dot} shadow-sm`} />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white drop-shadow-sm">
            {config.label}
          </span>
        </div>

        {book.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{book.rating}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{book.author}</p>

        <div className="mt-auto pt-3">
          {book.status === 'reading' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Clock size={11} />
                  <span>{progress}%</span>
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-medium">
                  p.{book.currentPage}/{book.totalPages}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: 'easeOut' as const }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </div>
          )}

          {book.status === 'completed' && (
            <div className="flex items-center gap-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              <Star size={11} className="fill-blue-400 text-blue-400" />
              <span>{book.totalPages} pages &middot; Finished</span>
            </div>
          )}

          {book.status === 'wishlist' && (
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              {book.totalPages} pages &middot; Not started
            </div>
          )}

          {book.status === 'dropped' && (
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              {book.totalPages} pages
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {book.category && (
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {book.category}
              </span>
            )}
            {book.tags && book.tags.length > 0 && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {book.tags.slice(0, 2).join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
