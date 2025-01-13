import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 conference: [],
 
};

const conferenceSlice = createSlice({
 name: 'conference',
 initialState,
 reducers: {
    // Define your reducers here
    addPaypal: (state, action) => {
      state.conference.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPaypal } = conferenceSlice.actions;

export default conferenceSlice.reducer;