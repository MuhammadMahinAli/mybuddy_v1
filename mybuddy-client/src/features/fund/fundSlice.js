import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 fund: [],
 
};

const fundSlice = createSlice({
 name: 'fund',
 initialState,
 reducers: {
    // Define your reducers here
    addFund: (state, action) => {
      state.fund.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addFund } = fundSlice.actions;

export default fundSlice.reducer;