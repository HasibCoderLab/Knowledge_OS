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
        <div className="text-center py-8">
          <BookOpen size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No book in progress</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Add a book to start tracking</p>
        </div>
      </Card>
    );
  }

  const progress = Math.round((book.currentPage / book.totalPages) * 100);

  return (
    <Card className="flex flex-col md:flex-row gap-4 md:gap-6">
      <div className="w-full md:w-32 h-40 md:h-44 shrink-0">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="min-w-0">
              <Badge variant="info" className="mb-2">Currently Reading</Badge>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 break-words">{book.title}</h3>
              <p className="text-sm text-gray-500">by {book.author}</p>
            </div>
            <span className="text-sm font-semibold text-indigo-600 shrink-0">{progress}%</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Page {book.currentPage} of {book.totalPages}</span>
              <span>{book.totalPages - book.currentPage} pages left</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500" 
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
