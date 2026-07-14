import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import type { Note } from '../../../types';

interface NoteFormProps {
  note?: Note | null;
  onSave: (data: NoteFormData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
  bookId?: string;
  bookTitle?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSave, onCancel, isSaving = false }) => {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [tagsInput, setTagsInput] = useState(note?.tags.join(', ') ?? '');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTagsInput(note.tags.join(', '));
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({ title: title.trim(), content, tags });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        required
        autoFocus
      />

      <Textarea
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note content here..."
        rows={8}
      />

      <Input
        label="Tags"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="tag1, tag2, tag3"
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isSaving} disabled={!title.trim()}>
          {note ? 'Save Changes' : 'Create Note'}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
