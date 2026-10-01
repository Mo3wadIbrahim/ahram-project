import { createSlice } from '@reduxjs/toolkit';
import initialItems from '../../data/items.json';

const saveState = (state) => {
  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'items', payload: state })
  }).catch(err => console.error('Failed to save to JSON file:', err));
};

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    data: initialItems,
  },
  reducers: {
    addItem: (state, action) => {
      state.data.push(action.payload);
      saveState(state.data);
    },
    updateItem: (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
        saveState(state.data);
      }
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
      saveState(state.data);
    }
  }
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
