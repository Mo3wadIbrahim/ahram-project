import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/itemsSlice';
import branchesReducer from './slices/branchesSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    branches: branchesReducer,
  },
});
