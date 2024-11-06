import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 paypal: [],
 
};

const paypalSlice = createSlice({
 name: 'paypal',
 initialState,
 reducers: {
    // Define your reducers here
    addPaypal: (state, action) => {
      state.paypal.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPaypal } = paypalSlice.actions;

export default paypalSlice.reducer;