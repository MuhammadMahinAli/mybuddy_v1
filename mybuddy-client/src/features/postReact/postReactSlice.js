import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 postReact: {},
 
};

const postReactSlice = createSlice({
 name: 'postReact',
 initialState,
 reducers: {
    // Define your reducers here
    addPostReact: (state, action) => {
      state.postReact.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPostReact } = postReactSlice.actions;

export default postReactSlice.reducer;