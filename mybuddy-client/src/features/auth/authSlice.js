import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
  postReact: {}, // Add this line
  
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      // state.postReact = action.payload.postReact || {}; 

        // Save to localStorage
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        // localStorage.setItem('postReact', JSON.stringify(state.postReact));
      },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      state.postReact = {}; // Clear the in-memory postReact

      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      // localStorage.removeItem('postReact');
    },
      // Add a reducer to update postReact state
      updatePostReact: (state, action) => {
        state.postReact = action.payload;
  
        // Save the updated postReact to localStorage with the user ID
        if (state.user && state.user._id) {
          localStorage.setItem(`postReact_${state.user._id}`, JSON.stringify(state.postReact));
        }
      },
  },
});

export const {userLoggedIn,userLoggedOut, updatePostReact} = authSlice.actions;
export default authSlice.reducer;