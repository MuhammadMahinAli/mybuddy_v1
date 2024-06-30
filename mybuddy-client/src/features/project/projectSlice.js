import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 project: [],
 
};

const projectSlice = createSlice({
 name: 'project',
 initialState,
 reducers: {
    // Define your reducers here
    addProject: (state, action) => {
      state.project.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;