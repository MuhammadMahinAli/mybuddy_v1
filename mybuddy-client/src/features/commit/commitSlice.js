import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 commits: [],
 
};

const commitSlice = createSlice({
 name: 'commits',
 initialState,
 reducers: {
    // Define your reducers here
    addCommit: (state, action) => {
      state.commits.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addCommit } = commitSlice.actions;

export default commitSlice.reducer;