import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 payoneerFund: [],
 
};

const payoneerFundSlice = createSlice({
 name: 'payoneerFund',
 initialState,
 reducers: {
    // Define your reducers here
    addPayoneerFund: (state, action) => {
      state.payoneerFund.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPayoneerFund } = payoneerFundSlice.actions;

export default payoneerFundSlice.reducer;