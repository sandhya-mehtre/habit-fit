import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WaterEntry, WaterFormValues } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import { loadFromStorage, saveToStorage } from '@/utils/storageUtils';
import { generateId } from '@/utils/helpers';

interface WaterState {
  entries: WaterEntry[];
}

const initialState: WaterState = {
  entries: loadFromStorage<WaterEntry[]>(STORAGE_KEYS.WATER, []),
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    addWaterEntry: (state, action: PayloadAction<WaterFormValues>) => {
      // Allow multiple entries per day (glasses/cups throughout the day)
      state.entries.push({ id: generateId(), ...action.payload });
      saveToStorage(STORAGE_KEYS.WATER, state.entries);
    },

    deleteWaterEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
      saveToStorage(STORAGE_KEYS.WATER, state.entries);
    },
  },
});

export const { addWaterEntry, deleteWaterEntry } = waterSlice.actions;
export default waterSlice.reducer;
