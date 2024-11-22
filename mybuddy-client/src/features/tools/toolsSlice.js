import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 adminTools: [],
 
};

const adminToolsSlice = createSlice({
 name: 'adminTools',
 initialState,
 reducers: {
    // Define your reducers here
    addAdminTools: (state, action) => {
      state.adminTools.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addAdminTools } = adminToolsSlice.actions;

export default adminToolsSlice.reducer;