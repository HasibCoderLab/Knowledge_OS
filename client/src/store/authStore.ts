import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../services/api/index';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  bio?: string;
  createdAt?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, username?: string) => Promise<void>;
  logout: (queryClient?: { clear: () => void }) => Promise<void>;
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
          const result = await authApi.login({ email, password });
          const { user, accessToken, refreshToken } = result as { user: AuthUser; accessToken: string; refreshToken: string };
          localStorage.setItem('accessToken', accessToken);
          if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
          set({ user, accessToken, isAuthenticated: true, isLoading: false });
        } catch (err: unknown) {
          const message =
            err && typeof err === 'object' && 'response' in err
              ? ((err as { response: { data: { message: string } } }).response?.data?.message ?? 'Login failed')
              : err instanceof Error
                ? err.message
                : 'Login failed. Please try again.';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      register: async (name: string, email: string, password: string, username?: string) => {
        set({ isLoading: true, error: null });
        try {
          const registerData: { name: string; email: string; password: string; username?: string } = { name, email, password };
          if (username) registerData.username = username;
          const result = await authApi.register(registerData);
          const { user, accessToken, refreshToken } = result as { user: AuthUser; accessToken: string; refreshToken: string };
          localStorage.setItem('accessToken', accessToken);
          if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
          set({ user, accessToken, isAuthenticated: true, isLoading: false });
        } catch (err: unknown) {
          const message =
            err && typeof err === 'object' && 'response' in err
              ? ((err as { response: { data: { message: string } } }).response?.data?.message ?? 'Registration failed')
              : err instanceof Error
                ? err.message
                : 'Registration failed. Please try again.';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      logout: async (queryClient?: { clear: () => void }) => {
        set({ isLoading: true });
        try {
          await authApi.logout();
        } catch {
          // proceed with local logout regardless
        } finally {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('auth-storage');
          // Clear React Query cache
          if (queryClient) {
            queryClient.clear();
          }
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },

      clearError: () => set({ error: null }),

      setAuth: (user, token) => {
        if (token) localStorage.setItem('accessToken', token);
        set({ user, accessToken: token, isAuthenticated: !!user, error: null });
      },
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
