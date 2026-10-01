import { createSlice } from '@reduxjs/toolkit';
import initialBranches from '../../data/branches.json';

const saveState = (state) => {
  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'branches', payload: state })
  }).catch(err => console.error('Failed to save to JSON file:', err));
};

const branchesSlice = createSlice({
  name: 'branches',
  initialState: {
    data: initialBranches,
  },
  reducers: {
    addBranch: (state, action) => {
      state.data.push(action.payload);
      saveState(state.data);
    },
    updateBranch: (state, action) => {
      const index = state.data.findIndex(branch => branch.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
        saveState(state.data);
      }
    },
    deleteBranch: (state, action) => {
      state.data = state.data.filter(branch => branch.id !== action.payload);
      saveState(state.data);
    }
  }
});

export const { addBranch, updateBranch, deleteBranch } = branchesSlice.actions;
export default branchesSlice.reducer;
