import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  researchbuddyAccessToken: undefined,
  user: undefined,
  postReact: {}, // Add this line
  
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.researchbuddyAccessToken = action.payload.researchbuddyAccessToken;
      state.user = action.payload.user;
      // state.postReact = action.payload.postReact || {}; 

        // Save to localStorage
        localStorage.setItem('researchbuddyAccessToken', action.payload.researchbuddyAccessToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        // localStorage.setItem('postReact', JSON.stringify(state.postReact));
      },
    userLoggedOut: (state) => {
      state.researchbuddyAccessToken = undefined;
      state.user = undefined;
      state.postReact = {}; // Clear the in-memory postReact

      // Clear localStorage
      localStorage.removeItem('researchbuddyAccessToken');
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