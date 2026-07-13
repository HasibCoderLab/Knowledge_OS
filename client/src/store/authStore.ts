import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      accessToken: 'mock-token',
      isAuthenticated: true,

      setAuth: (user, token) => set({ 
        user, 
        accessToken: token, 
        isAuthenticated: true 
      }),

      logout: () => {
        localStorage.removeItem('accessToken');
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
