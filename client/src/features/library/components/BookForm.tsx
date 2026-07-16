import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import type { Book } from '../../../types';

export interface BookFormData {
  title: string;
  author: string;
  category: string | null;
  coverUrl: string | null;
  status: 'reading' | 'completed' | 'paused' | 'wishlist' | 'dropped';
  totalPages: number | null;
  currentPage: number;
  startDate: string | null;
  finishDate: string | null;
  rating: number | null;
  tags: string[];
}

interface BookFormProps {
  book?: Book | null;
  onSave: (data: BookFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSave, onCancel, isSaving = false }) => {
  const [title, setTitle] = useState(book?.title ?? '');
  const [author, setAuthor] = useState(book?.author ?? '');
  const [category, setCategory] = useState(book?.category ?? '');
  const [status, setStatus] = useState<'reading' | 'completed' | 'paused' | 'wishlist' | 'dropped'>(book?.status ?? 'wishlist');
  const [totalPages, setTotalPages] = useState(book?.totalPages ?? '');
  const [startDate, setStartDate] = useState(book?.startDate?.split('T')[0] ?? '');
  const [finishDate, setFinishDate] = useState(book?.finishDate?.split('T')[0] ?? '');
  const [rating, setRating] = useState(book?.rating ?? '');
  const [tagsInput, setTagsInput] = useState(book?.tags?.join(', ') ?? '');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setStatus(book.status);
      setTotalPages(book.totalPages);
      setStartDate(book.startDate?.split('T')[0] ?? '');
      setFinishDate(book.finishDate?.split('T')[0] ?? '');
      setRating(book.rating ?? '');
      setTagsInput(book.tags?.join(', ') ?? '');
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      author: author.trim(),
      category: category || null,
      coverUrl: null,
      status,
      totalPages: totalPages ? Number(totalPages) : null,
      currentPage: book?.currentPage ?? 0,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      finishDate: finishDate ? new Date(finishDate).toISOString() : null,
      rating: rating ? Number(rating) : null,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book title"
          required
          autoFocus
        />
        <Input
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Fiction, Science"
        />
        <Select
          label="Status"
          value={status}
           onChange={(e) => setStatus(e.target.value as 'reading' | 'completed' | 'paused' | 'wishlist' | 'dropped')}
          options={[
            { value: 'wishlist', label: 'Wishlist' },
            { value: 'reading', label: 'Reading' },
            { value: 'paused', label: 'Paused' },
            { value: 'completed', label: 'Completed' },
            { value: 'dropped', label: 'Dropped' },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Total Pages"
          type="number"
          min={0}
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
          placeholder="e.g. 350"
        />
        <Select
          label="Rating"
          value={rating ? String(rating) : ''}
          onChange={(e) => setRating(e.target.value ? Number(e.target.value) : '')}
          options={[
            { value: '1', label: '1 Star' },
            { value: '2', label: '2 Stars' },
            { value: '3', label: '3 Stars' },
            { value: '4', label: '4 Stars' },
            { value: '5', label: '5 Stars' },
          ]}
          placeholder="No rating"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          label="Finish Date"
          type="date"
          value={finishDate}
          onChange={(e) => setFinishDate(e.target.value)}
        />
      </div>

      <Input
        label="Tags"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="fiction, fantasy, to-read"
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isSaving} disabled={!title.trim() || !author.trim()}>
          {book ? 'Save Changes' : 'Create Book'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
