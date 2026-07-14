import React from 'react';
import { Pin, Star, Edit3, Trash2, MoreHorizontal, Calendar, FileText } from 'lucide-react';
import Dropdown from '../../../components/ui/Dropdown';
import type { Note } from '../../../types';

interface NoteListItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onTogglePin: (note: Note) => void;
  onToggleFavorite: (note: Note) => void;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note, onEdit, onDelete, onTogglePin, onToggleFavorite }) => {
  const preview = note.content.length > 100
    ? note.content.slice(0, 100) + '...'
    : note.content;

  return (
    <div
      className={`
        flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border rounded-xl transition-all hover:shadow-sm
        ${note.isPinned
          ? 'border-indigo-200 dark:border-indigo-800'
          : 'border-slate-200 dark:border-slate-800'
        }
      `}
    >
      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
        <FileText size={15} className="text-slate-500 dark:text-slate-400" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {note.title}
              </h3>
              {note.isPinned && <Pin size={11} className="text-indigo-400 shrink-0" />}
              {note.isFavorite && <Star size={11} className="fill-amber-400 text-amber-400 shrink-0" />}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
              {preview}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onTogglePin(note)}
              className={`p-1.5 rounded-lg transition-colors ${
                note.isPinned
                  ? 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800'
              }`}
              aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
            >
              <Pin size={13} />
            </button>
            <button
              onClick={() => onToggleFavorite(note)}
              className={`p-1.5 rounded-lg transition-colors ${
                note.isFavorite
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800'
              }`}
              aria-label={note.isFavorite ? 'Unfavorite note' : 'Favorite note'}
            >
              <Star size={13} />
            </button>
            <Dropdown
              trigger={<MoreHorizontal size={15} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />}
              align="right"
              items={[
                { label: 'Edit', icon: <Edit3 size={14} />, onClick: () => onEdit(note) },
                { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => onDelete(note), variant: 'danger' },
              ]}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2.5">
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
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
          <span className="flex items-center gap-1 text-[10px] text-slate-400 ml-auto">
            <Calendar size={10} />
            {note.createdAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteListItem;
