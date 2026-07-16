import api from './client';

function unwrap<T>(response: { data: { success: boolean; data: T } }): T {
  return response.data.data;
}

function extract<T>(response: { data: { success: boolean; data: T; pagination?: unknown } }): T & { pagination?: unknown } {
  return { ...response.data.data, ...(response.data.pagination ? { pagination: response.data.pagination } : {}) };
}

export interface UserProfile {
  id: string;
  name: string;
  username: string | null;
  email: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  theme: string;
  language: string;
  createdAt: string;
}

export const authApi = {
  register: (data: { name: string; email: string; password: string; username?: string }) =>
    api.post('/auth/register', data).then(unwrap),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data).then(unwrap),
  logout: () => api.post('/auth/logout'),
  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }).then(unwrap),
  getMe: () => api.get('/users/me').then(unwrap),
  updateProfile: (data: Record<string, unknown>) =>
    api.patch('/users/me', data).then(unwrap),
};

export const usersApi = {
  getProfile: () => api.get('/users/me').then(unwrap),
  updateProfile: (data: Record<string, unknown>) =>
    api.patch('/users/me', data).then(unwrap),
};

export const libraryApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/library', { params }).then((r) => r.data),
  getById: (id: string) =>
    api.get(`/library/${id}`).then(unwrap),
  create: (data: Record<string, unknown>) =>
    api.post('/library', data).then(unwrap),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/library/${id}`, data).then(unwrap),
  delete: (id: string) =>
    api.delete(`/library/${id}`),
};

export const readingApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/reading/sessions', { params }).then((r) => r.data),
  getById: (id: string) =>
    api.get(`/reading/sessions/${id}`).then(unwrap),
  create: (data: Record<string, unknown>) =>
    api.post('/reading/sessions', data).then(unwrap),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/reading/sessions/${id}`, data).then(unwrap),
  delete: (id: string) =>
    api.delete(`/reading/sessions/${id}`),
};

export const journalApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/journal', { params }).then((r) => r.data),
  getById: (id: string) =>
    api.get(`/journal/${id}`).then(unwrap),
  create: (data: Record<string, unknown>) =>
    api.post('/journal', data).then(unwrap),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/journal/${id}`, data).then(unwrap),
  delete: (id: string) =>
    api.delete(`/journal/${id}`),
};

export const goalsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/goals', { params }).then((r) => r.data),
  getById: (id: string) =>
    api.get(`/goals/${id}`).then(unwrap),
  create: (data: Record<string, unknown>) =>
    api.post('/goals', data).then(unwrap),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/goals/${id}`, data).then(unwrap),
  delete: (id: string) =>
    api.delete(`/goals/${id}`),
};

export const tasksApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/tasks', { params }).then((r) => r.data),
  getById: (id: string) =>
    api.get(`/tasks/${id}`).then(unwrap),
  create: (data: Record<string, unknown>) =>
    api.post('/tasks', data).then(unwrap),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/tasks/${id}`, data).then(unwrap),
  delete: (id: string) =>
    api.delete(`/tasks/${id}`),
};

export const habitsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/habits', { params }).then((r) => r.data),
  getById: (id: string) =>
    api.get(`/habits/${id}`).then(unwrap),
  create: (data: Record<string, unknown>) =>
    api.post('/habits', data).then(unwrap),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch(`/habits/${id}`, data).then(unwrap),
  delete: (id: string) =>
    api.delete(`/habits/${id}`),
  log: (habitId: string, data: Record<string, unknown>) =>
    api.post(`/habits/${habitId}/logs`, data).then(unwrap),
};

export const settingsApi = {
  get: () => api.get('/settings').then(unwrap) as Promise<{ data: UserProfile }>,
  update: (data: Record<string, unknown>) =>
    api.patch('/settings', data).then(unwrap) as Promise<{ data: UserProfile }>,
};

export const analyticsApi = {
  getDashboard: () =>
    api.get('/analytics/dashboard').then(unwrap),
  getReading: () =>
    api.get('/analytics/reading').then(unwrap),
  getGoals: () =>
    api.get('/analytics/goals').then(unwrap),
  getTasks: () =>
    api.get('/analytics/tasks').then(unwrap),
  getHabits: () =>
    api.get('/analytics/habits').then(unwrap),
};

export const notificationsApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/notifications', { params }).then((r) => r.data),
  markRead: (id: string) =>
    api.patch(`/notifications/${id}/read`),
  markAllRead: () =>
    api.patch('/notifications/read-all'),
  delete: (id: string) =>
    api.delete(`/notifications/${id}`),
};

export const activitiesApi = {
  getAll: (params?: Record<string, unknown>) =>
    api.get('/activities', { params }).then((r) => r.data),
  getRecent: () =>
    api.get('/activities/recent').then(unwrap),
  create: (data: Record<string, unknown>) =>
    api.post('/activities', data).then(unwrap),
};

export const aiApi = {
  getConversations: (params?: Record<string, unknown>) =>
    api.get('/ai/conversations', { params }).then((r) => r.data),
  getConversation: (id: string) =>
    api.get(`/ai/conversations/${id}`).then(unwrap),
  createConversation: (data: Record<string, unknown>) =>
    api.post('/ai/conversations', data).then(unwrap),
  sendMessage: (conversationId: string, data: Record<string, unknown>) =>
    api.post(`/ai/conversations/${conversationId}/messages`, data).then(unwrap),
  deleteConversation: (id: string) =>
    api.delete(`/ai/conversations/${id}`),
};
