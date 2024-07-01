import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  experience: [],
 
};

const experienceSlice = createSlice({
 name: 'experience',
 initialState,
 reducers: {
    // Define your reducers here
    addExperience: (state, action) => {
      state.experience.push(action.payload);
    },
 },

});

export const { addExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
