import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 bankTransferFund: [],
 
};

const bankTransferFundSlice = createSlice({
 name: 'bankTransferFund',
 initialState,
 reducers: {
    // Define your reducers here
    addBankTransferFund: (state, action) => {
      state.bankTransferFund.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addBankTransferFund } = bankTransferFundSlice.actions;

export default bankTransferFundSlice.reducer;