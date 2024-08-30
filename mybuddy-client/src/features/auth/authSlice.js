import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

        // Save to localStorage
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;

      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }

  },
});

export const {userLoggedIn,userLoggedOut} = authSlice.actions;
export default authSlice.reducer;