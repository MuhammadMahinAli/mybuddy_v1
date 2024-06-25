import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  license: [],
 
};

const licenseSlice = createSlice({
 name: 'license',
 initialState,
 reducers: {
    // Define your reducers here
    addlicense: (state, action) => {
      state.license.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addlicense } = licenseSlice.actions;

export default licenseSlice.reducer;
