import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import projectReducer from "../features/project/projectSlice";
import themeReducer from "../features/theme/themeSlice";
import SidebarReducer from "../features/SidebarSlice/SidebarSlice";
import skillReducer from "../features/skill/skillSlice";
import socialInfoReducer from "../features/social-info/socialInfoSlice"
import licenseReducer from "../features/license/licenseSlice";
import experienceReducer from "../features/experience/experienceSlice"
import commitReducer from "../features/commit/commitSlice";
import fundReducer from "../features/fund/fundSlice";
import meetingReducer from "../features/meeting/meetingSlice";
import postReactReducer from "../features/postReact/postReactSlice";
import paypalReducer from "../features/paypal/paypalSlice"
import payoneerReducer from "../features/payoneer/payoneerSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    post: postReducer,
    project: projectReducer,
    theme: themeReducer,
    sidebar:SidebarReducer,
    skill:skillReducer,
    socialInfo:socialInfoReducer,
    license:licenseReducer,
    experience:experienceReducer,
    commit:commitReducer,
    fund:fundReducer,
    meeting:meetingReducer,
    postReact:postReactReducer,
    paypal:paypalReducer,
    payoneer:payoneerReducer

   
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});

