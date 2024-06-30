import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 socialInfo: [],
 
};

const socialInfoSlice = createSlice({
 name: 'socialInfo',
 initialState,
 reducers: {
    // Define your reducers here
    addSocialInfo: (state, action) => {
      state.socialInfo.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addSocialInfo } = socialInfoSlice.actions;

export default socialInfoSlice.reducer;
