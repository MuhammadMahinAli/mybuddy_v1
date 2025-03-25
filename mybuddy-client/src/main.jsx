import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserContext from "./Context/UserContext.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { PostProvider } from "./Context/PostContext.jsx";

AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContext>
      <PostProvider>
        <RouterProvider router={router} />
        </PostProvider>
      </UserContext>
    </Provider>
  </React.StrictMode>
);
