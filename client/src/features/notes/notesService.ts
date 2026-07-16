import type { Note } from '../../types';

let notesData: Note[] = [
  {
    id: 'note-1',
    title: 'Key Insights from Atomic Habits',
    content: 'The Four Laws of Behavior Change:\n\n1. Make it Obvious\n2. Make it Attractive\n3. Make it Easy\n4. Make it Satisfying',
    bookId: 'book-1',
    bookTitle: 'Atomic Habits',
    tags: ['habits', 'productivity'],
    isPinned: true,
    isFavorite: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'note-2',
    title: 'Deep Work Philosophy',
    content: 'Deep work is the ability to focus without distraction on a cognitively demanding task.',
    bookId: 'book-2',
    bookTitle: 'Deep Work',
    tags: ['focus', 'productivity'],
    isPinned: false,
    isFavorite: true,
    createdAt: '2023-12-05',
    updatedAt: '2023-12-05',
  },
  {
    id: 'note-3',
    title: 'React Performance Tips',
    content: '1. Use React.memo for expensive components\n2. Implement virtualization for long lists',
    tags: ['react', 'performance', 'coding'],
    isPinned: false,
    isFavorite: false,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-12',
  },
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export const notesService = {
  async getAll() {
    await sleep(200);
    return { success: true as const, data: [...notesData] };
  },

  async create(note: { title: string; content: string; tags: string[]; isPinned: boolean; isFavorite: boolean }) {
    await sleep(200);
    const now = new Date().toISOString().split('T')[0]!;
    const newNote: Note = { ...note, id: `note-${Date.now()}`, createdAt: now, updatedAt: now } as Note;
    notesData = [newNote, ...notesData];
    return { success: true as const, data: newNote };
  },

  async update(id: string, updates: Partial<Note>) {
    await sleep(200);
    const idx = notesData.findIndex((n) => n.id === id);
    if (idx === -1) return { success: true as const, data: undefined };
    notesData[idx] = { ...notesData[idx]!, ...updates, id, updatedAt: new Date().toISOString().split('T')[0]! };
    return { success: true as const, data: notesData[idx] };
  },

  async delete(id: string) {
    await sleep(100);
    notesData = notesData.filter((n) => n.id !== id);
    return { success: true as const, data: null };
  },

  async togglePin(id: string) {
    await sleep(100);
    const note = notesData.find((n) => n.id === id);
    if (note) note.isPinned = !note.isPinned;
    return { success: true as const, data: note };
  },

  async toggleFavorite(id: string) {
    await sleep(100);
    const note = notesData.find((n) => n.id === id);
    if (note) note.isFavorite = !note.isFavorite;
    return { success: true as const, data: note };
  },
};
