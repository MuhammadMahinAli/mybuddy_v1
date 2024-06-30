import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 posts: [],
 
};

const postSlice = createSlice({
 name: 'posts',
 initialState,
 reducers: {
    // Define your reducers here
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;