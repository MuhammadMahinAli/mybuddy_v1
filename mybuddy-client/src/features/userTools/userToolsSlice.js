import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 userTools: [],
 
};

const userToolsSlice = createSlice({
 name: 'userTools',
 initialState,
 reducers: {
    // Define your reducers here
    addUserTools: (state, action) => {
      state.userTools.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addUserTools } = userToolsSlice.actions;

export default userToolsSlice.reducer;