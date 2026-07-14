import api from './axios';

export const authService = {
  async register(userData: Record<string, unknown>) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async login(credentials: Record<string, unknown>) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async getMe() {
    const response = await api.get('/users/me');
    return response.data;
  },
};
