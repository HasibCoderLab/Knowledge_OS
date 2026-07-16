import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Select from '../../../components/ui/Select';
import type { JournalEntry } from '../../../types';

export interface JournalFormData {
  title: string;
  content: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  date: string;
  tags: string[];
}

interface JournalFormProps {
  entry?: JournalEntry | null;
  onSave: (data: JournalFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const JournalForm: React.FC<JournalFormProps> = ({ entry, onSave, onCancel, isSaving = false }) => {
  const [title, setTitle] = useState(entry?.title ?? '');
  const [content, setContent] = useState(entry?.content ?? '');
  const [mood, setMood] = useState<'great' | 'good' | 'neutral' | 'bad' | 'terrible'>(entry?.mood ?? 'good');
  const initialDate: string = entry?.date ? entry.date.substring(0, 10) : new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState<string>(initialDate);
  const [tagsInput, setTagsInput] = useState(entry?.tags?.join(', ') ?? '');

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setMood(entry.mood);
      setDate(entry.date?.split('T')[0] ?? '');
      setTagsInput(entry.tags?.join(', ') ?? '');
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      content: content.trim(),
      mood,
      date: new Date(date || new Date().toISOString()).toISOString(),
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry title"
        required
        autoFocus
      />

      <Textarea
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
        rows={6}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value as 'great' | 'good' | 'neutral' | 'bad' | 'terrible')}
          options={[
            { value: 'great', label: 'Great' },
            { value: 'good', label: 'Good' },
            { value: 'neutral', label: 'Neutral' },
            { value: 'bad', label: 'Bad' },
            { value: 'terrible', label: 'Terrible' },
          ]}
        />
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <Input
        label="Tags"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="reflection, learning, gratitude"
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isSaving} disabled={!title.trim() || !content.trim()}>
          {entry ? 'Save Changes' : 'Create Entry'}
        </Button>
      </div>
    </form>
  );
};

export default JournalForm;
