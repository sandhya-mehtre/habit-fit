import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Theme } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage } from '@/utils/storageUtils';

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  activeModal: string | null;
}

const savedTheme = loadFromStorage<Theme>(STORAGE_KEYS.THEME, 'dark');

const initialState: UIState = {
  theme: savedTheme,
  sidebarOpen: false,
  activeModal: null,
};

// Apply theme to <html> element on init
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      saveToStorage(STORAGE_KEYS.THEME, state.theme);
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      saveToStorage(STORAGE_KEYS.THEME, state.theme);
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload;
    },

    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
