import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import type { Book, ReadingSession } from '../../../types';

export interface ReadingSessionFormData {
  bookId: string;
  date: string;
  pagesRead: number;
  durationMinutes: number;
  startPage: number;
  endPage: number;
}

interface ReadingSessionFormProps {
  session?: ReadingSession | null;
  books: Book[];
  onSave: (data: ReadingSessionFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const ReadingSessionForm: React.FC<ReadingSessionFormProps> = ({ session, books, onSave, onCancel, isSaving = false }) => {
  const [bookId, setBookId] = useState(session?.bookId ?? '');
  const [date, setDate] = useState(session?.date?.split('T')[0] ?? new Date().toISOString().split('T')[0]);
  const [pagesRead, setPagesRead] = useState(session?.pagesRead ?? '');
  const [durationMinutes, setDurationMinutes] = useState(session?.durationMinutes ?? '');
  const [startPage, setStartPage] = useState(session?.startPage ?? '');
  const [endPage, setEndPage] = useState(session?.endPage ?? '');

  useEffect(() => {
    if (session) {
      setBookId(session.bookId);
      setDate(session.date?.split('T')[0] ?? '');
      setPagesRead(session.pagesRead);
      setDurationMinutes(session.durationMinutes);
      setStartPage(session.startPage);
      setEndPage(session.endPage);
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId || !date || !pagesRead || !durationMinutes || startPage === '' || endPage === '') return;

    onSave({
      bookId,
      date: new Date(date).toISOString(),
      pagesRead: Number(pagesRead),
      durationMinutes: Number(durationMinutes),
      startPage: Number(startPage),
      endPage: Number(endPage),
    });
  };

  const bookOptions = books.map((b) => ({
    value: b.id,
    label: `${b.title}${b.author ? ` — ${b.author}` : ''}`,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Book"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        options={bookOptions}
        placeholder="Select a book"
        required
        autoFocus
      />

      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Pages Read"
          type="number"
          min={1}
          value={pagesRead}
          onChange={(e) => setPagesRead(e.target.value)}
          placeholder="e.g. 30"
          required
        />
        <Input
          label="Duration (minutes)"
          type="number"
          min={1}
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          placeholder="e.g. 45"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Page"
          type="number"
          min={0}
          value={startPage}
          onChange={(e) => setStartPage(e.target.value)}
          placeholder="e.g. 1"
          required
        />
        <Input
          label="End Page"
          type="number"
          min={0}
          value={endPage}
          onChange={(e) => setEndPage(e.target.value)}
          placeholder="e.g. 30"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isSaving} disabled={!bookId || !date || !pagesRead || !durationMinutes || startPage === '' || endPage === ''}>
          {session ? 'Save Changes' : 'Create Session'}
        </Button>
      </div>
    </form>
  );
};

export default ReadingSessionForm;
