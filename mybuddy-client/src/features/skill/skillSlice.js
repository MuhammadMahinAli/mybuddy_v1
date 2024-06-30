import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 skill: [],
 
};

const skillSlice = createSlice({
 name: 'skill',
 initialState,
 reducers: {
    // Define your reducers here
    addSkill: (state, action) => {
      state.skill.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addSkill } = skillSlice.actions;

export default skillSlice.reducer;
