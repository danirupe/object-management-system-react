import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from './globalSlice';

export const store = configureStore({
  reducer: {
    globalState: globalSlice.reducer,
  },
});