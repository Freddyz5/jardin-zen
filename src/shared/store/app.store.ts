import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface AppState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'system',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setTheme: (theme: ThemeMode) => set({ theme }),
}));
