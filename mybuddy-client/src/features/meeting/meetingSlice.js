import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 meeting: [],
 
};

const meetingSlice = createSlice({
 name: 'meeting',
 initialState,
 reducers: {
    // Define your reducers here
    addMeeting: (state, action) => {
      state.meeting.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addMeeting } = meetingSlice.actions;

export default meetingSlice.reducer;