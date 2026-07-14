import React from 'react';
import { BookOpen } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  currentPage: number;
  totalPages: number;
  status: string;
}

interface ReadingProgressCardProps {
  book?: Book | undefined;
}

const ReadingProgressCard: React.FC<ReadingProgressCardProps> = ({ book }) => {
  if (!book) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 inline-block mb-4">
            <BookOpen size={28} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">No book in progress</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Add a book to start tracking</p>
        </div>
      </Card>
    );
  }

  const progress = Math.round((book.currentPage / book.totalPages) * 100);

  return (
    <Card className="flex flex-col md:flex-row gap-4 md:gap-6">
      <div className="w-full md:w-32 h-40 md:h-44 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="min-w-0">
              <Badge variant="info" className="mb-2">Currently Reading</Badge>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white break-words leading-snug">{book.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">by {book.author}</p>
            </div>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0">{progress}%</span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-1.5">
              <span>Page {book.currentPage} of {book.totalPages}</span>
              <span>{book.totalPages - book.currentPage} pages left</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button size="sm" variant="primary">Update Progress</Button>
          <Button size="sm" variant="outline">View Notes</Button>
        </div>
      </div>
    </Card>
  );
};

export default ReadingProgressCard;
