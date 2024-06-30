import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 friend: [],
 
};

const friendSlice = createSlice({
 name: 'friend',
 initialState,
 reducers: {
    // Define your reducers here
    addFriend: (state, action) => {
      state.friend.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addFriend } = friendSlice.actions;

export default friendSlice.reducer;