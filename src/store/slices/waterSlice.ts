import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WaterEntry, WaterFormValues } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage, userScopedKey } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface WaterState {
  entries: WaterEntry[];
  userId: string | null;
}

const initialState: WaterState = {
  entries: [],
  userId: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
      state.entries = loadFromStorage<WaterEntry[]>(
        userScopedKey(STORAGE_KEYS.WATER, action.payload),
        []
      );
    },

    addWaterEntry: (state, action: PayloadAction<WaterFormValues>) => {
      state.entries.push({ id: generateId(), ...action.payload });
      saveToStorage(userScopedKey(STORAGE_KEYS.WATER, state.userId), state.entries);
    },

    deleteWaterEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
      saveToStorage(userScopedKey(STORAGE_KEYS.WATER, state.userId), state.entries);
    },
  },
});

export const { setActiveUser, addWaterEntry, deleteWaterEntry } = waterSlice.actions;
export default waterSlice.reducer;
