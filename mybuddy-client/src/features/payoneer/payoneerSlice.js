import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 payoneer: [],
 
};

const payoneerSlice = createSlice({
 name: 'payoneer',
 initialState,
 reducers: {
    // Define your reducers here
    addPayoneer: (state, action) => {
      state.payoneer.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPayoneer } = payoneerSlice.actions;

export default payoneerSlice.reducer;