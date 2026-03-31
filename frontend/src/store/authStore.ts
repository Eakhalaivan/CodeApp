import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

interface AuthState {
  token: string | null;
  user: any | null;
  setAuth: (user: any, token: string) => void;
  login: (email: string, pass: string) => Promise<void>;
  socialLogin: (provider: string, email?: string) => Promise<void>;
  register: (username: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (user, token) => set({ user, token }),
      login: async (email, password) => {
         const res = await api.post('/auth/login', { email, password });
         const { user, token } = res.data;
         set({ user, token });
      },
      socialLogin: async (provider, email) => {
         // Simulate network delay
         await new Promise(r => setTimeout(r, 600));
         const userEmail = email || 'social@example.com';
         const namePrefix = userEmail.split('@')[0];
         const mockUser = { id: 1, username: `${namePrefix}_via_${provider.toLowerCase()}`, email: userEmail, role: 'USER' };
         const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(7);
         set({ user: mockUser, token: mockToken });
      },
      register: async (username, email, password) => {
         const res = await api.post('/auth/register', { username, email, password });
         const { user, token } = res.data;
         set({ user, token });
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
