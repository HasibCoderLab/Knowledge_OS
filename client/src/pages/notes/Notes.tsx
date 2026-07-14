import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FileText, Plus, AlertTriangle } from 'lucide-react';
import { mockApi } from '../../services/mocks/mockApi';
import NoteCard from '../../features/notes/components/NoteCard';
import NoteListItem from '../../features/notes/components/NoteListItem';
import NoteFilters from '../../features/notes/components/NoteFilters';
import NoteForm from '../../features/notes/components/NoteForm';
import type { NoteFormData } from '../../features/notes/components/NoteForm';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';
import type { Note } from '../../types';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'favorites', label: 'Favorites' },
  { value: 'pinned', label: 'Pinned' },
];

export const Notes: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: mockApi.getNotes,
  });

  const notes = data?.data ?? [];

  const invalidateNotes = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  }, [queryClient]);

  const filteredNotes = useMemo(() => {
    let result = notes;

    if (activeFilter === 'favorites') {
      result = result.filter((n) => n.isFavorite);
    } else if (activeFilter === 'pinned') {
      result = result.filter((n) => n.isPinned);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.content.toLowerCase().includes(query) ||
          n.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return result;
  }, [notes, activeFilter, searchQuery]);

  const filterOptionsWithCounts = useMemo(() => {
    const all = notes.length;
    const favorites = notes.filter((n) => n.isFavorite).length;
    const pinned = notes.filter((n) => n.isPinned).length;
    return filterOptions.map((opt) => ({
      ...opt,
      count: opt.value === 'all' ? all : opt.value === 'favorites' ? favorites : pinned,
    }));
  }, [notes]);

  const handleCreate = useCallback(async (formData: NoteFormData) => {
    setIsSaving(true);
    await mockApi.createNote({
      title: formData.title,
      content: formData.content,
      tags: formData.tags,
      isPinned: false,
      isFavorite: false,
    });
    setIsSaving(false);
    setIsCreating(false);
    invalidateNotes();
  }, [invalidateNotes]);

  const handleUpdate = useCallback(async (formData: NoteFormData) => {
    if (!editingNote) return;
    setIsSaving(true);
    await mockApi.updateNote(editingNote.id, {
      title: formData.title,
      content: formData.content,
      tags: formData.tags,
    });
    setIsSaving(false);
    setEditingNote(null);
    invalidateNotes();
  }, [editingNote, invalidateNotes]);

  const handleDelete = useCallback(async () => {
    if (!deletingNote) return;
    await mockApi.deleteNote(deletingNote.id);
    setDeletingNote(null);
    invalidateNotes();
  }, [deletingNote, invalidateNotes]);

  const handleTogglePin = useCallback(async (note: Note) => {
    await mockApi.togglePinNote(note.id);
    invalidateNotes();
  }, [invalidateNotes]);

  const handleToggleFavorite = useCallback(async (note: Note) => {
    await mockApi.toggleFavoriteNote(note.id);
    invalidateNotes();
  }, [invalidateNotes]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Notes</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Capture your thoughts and ideas</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex gap-1 pt-2">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Notes</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Capture your thoughts and ideas</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setIsCreating(true)}>
          <Plus size={16} /> New Note
        </Button>
      </header>

      <NoteFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filterOptions={filterOptionsWithCounts}
      />

      {filteredNotes.length === 0 ? (
        searchQuery || activeFilter !== 'all' ? (
          <EmptyState icon={FileText} title="No notes found" description="Try a different search or filter" />
        ) : (
          <EmptyState
            icon={FileText}
            title="No notes yet"
            description="Create your first note to start capturing knowledge"
            actionLabel="New Note"
            onAction={() => setIsCreating(true)}
          />
        )
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setEditingNote}
              onDelete={setDeletingNote}
              onTogglePin={handleTogglePin}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              onEdit={setEditingNote}
              onDelete={setDeletingNote}
              onTogglePin={handleTogglePin}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)} title="Create Note" size="lg">
        <NoteForm onSave={handleCreate} onCancel={() => setIsCreating(false)} isSaving={isSaving} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editingNote} onClose={() => setEditingNote(null)} title="Edit Note" size="lg">
        {editingNote && (
          <NoteForm note={editingNote} onSave={handleUpdate} onCancel={() => setEditingNote(null)} isSaving={isSaving} />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deletingNote} onClose={() => setDeletingNote(null)} title="Delete Note" size="sm">
        {deletingNote && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 shrink-0">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Are you sure you want to delete "<span className="font-semibold">{deletingNote.title}</span>"?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDeletingNote(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
