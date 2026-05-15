import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  hasFinishedOnboarding: boolean;
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  hasFinishedOnboarding: false,
  user: null,
  login: (userData) => set({ isLoggedIn: true, user: userData }),
  logout: () => set({ isLoggedIn: false, user: null }),
  completeOnboarding: () => set({ hasFinishedOnboarding: true }),
}));
