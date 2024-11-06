import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 paypalFund: [],
 
};

const paypalFundFundSlice = createSlice({
 name: 'paypalFund',
 initialState,
 reducers: {
    // Define your reducers here
    addPaypalFund: (state, action) => {
      state.paypalFund.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPaypalFund } = paypalFundFundSlice.actions;

export default paypalFundFundSlice.reducer;