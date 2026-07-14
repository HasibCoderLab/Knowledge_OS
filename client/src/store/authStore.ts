import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockAuth, type AuthUser } from '../features/auth/services/mockAuth';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setAuth: (user: AuthUser | null, token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockAuth.login({ email, password });
          set({ user, accessToken: token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      register: async (name: string, email: string, password: string, username?: string) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockAuth.register({ name, email, password, username });
          set({ user, accessToken: token, isAuthenticated: true, isLoading: false });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await mockAuth.logout();
        } finally {
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },

      clearError: () => set({ error: null }),

      setAuth: (user, token) =>
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
          error: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
