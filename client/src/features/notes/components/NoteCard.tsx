import React from 'react';
import { Pin, Star, Edit3, Trash2, MoreHorizontal, Calendar } from 'lucide-react';
import Dropdown from '../../../components/ui/Dropdown';
import type { Note } from '../../../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onTogglePin: (note: Note) => void;
  onToggleFavorite: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete, onTogglePin, onToggleFavorite }) => {
  const preview = note.content.length > 140
    ? note.content.slice(0, 140) + '...'
    : note.content;

  return (
    <div
      className={`
        group flex flex-col bg-white dark:bg-slate-900 border rounded-2xl transition-all hover:shadow-md h-full
        ${note.isPinned
          ? 'border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-100 dark:ring-indigo-900'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }
      `}
    >
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug flex-1">
            {note.title}
          </h3>
          <Dropdown
            trigger={<MoreHorizontal size={15} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 shrink-0" />}
            align="right"
            items={[
              { label: 'Edit', icon: <Edit3 size={14} />, onClick: () => onEdit(note) },
              { label: note.isPinned ? 'Unpin' : 'Pin', icon: <Pin size={14} />, onClick: () => onTogglePin(note) },
              { label: note.isFavorite ? 'Unfavorite' : 'Favorite', icon: <Star size={14} />, onClick: () => onToggleFavorite(note) },
              { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => onDelete(note), variant: 'danger' },
            ]}
          />
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1">
          {preview}
        </p>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-medium text-slate-500 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Calendar size={11} />
            {note.createdAt}
          </span>
          <div className="flex items-center gap-1">
            {note.isPinned && <Pin size={13} className="text-indigo-400" />}
            {note.isFavorite && <Star size={13} className="fill-amber-400 text-amber-400" />}
          </div>
        </div>
      </div>

      {note.bookId && note.bookTitle && (
        <div className="px-5 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] text-slate-400 truncate">
            From: {note.bookTitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
