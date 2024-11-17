import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 adminBankInfo: [],
 
};

const adminBankInfoSlice = createSlice({
 name: 'adminBankInfo',
 initialState,
 reducers: {
    // Define your reducers here
    addPaypal: (state, action) => {
      state.adminBankInfo.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPaypal } = adminBankInfoSlice.actions;

export default adminBankInfoSlice.reducer;