// import { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { userLoggedIn, userLoggedOut } from "../features/auth/authSlice";

// export const useAuthCheck = () => {
//   const dispatch = useDispatch();
//   const [authChecked, setAuthChecked] = useState(false);
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   useEffect(() => {
//     if (auth) {
//       dispatch(
//         userLoggedIn({ accessToken: auth?.accessToken, user: auth?.user })
//       );
//     }

//     setAuthChecked(true);
//   }, [dispatch]);

//   const logout = () => {
//     dispatch(userLoggedOut());
//     localStorage.removeItem("auth");
//   };
//   return { logout, authChecked };
// };

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updatePostReact,
  userLoggedIn,
  userLoggedOut,
 
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
   // const postReact = JSON.parse(localStorage.getItem("postReact")) || {};

   if (auth) {
    dispatch(userLoggedIn({ accessToken: auth?.accessToken, user: auth?.user }));

    // Load the user's postReact data from localStorage if it exists
    const savedPostReact = JSON.parse(localStorage.getItem(`postReact_${auth.user._id}`));
    if (savedPostReact) {
      dispatch(updatePostReact(savedPostReact));
    }
  }

  setAuthChecked(true);

    // Event listener to track changes to localStorage (e.g., login/logout from other tabs)
    const handleStorageChange = (event) => {
      if (event.key === "auth") {
        const updatedAuth = JSON.parse(localStorage.getItem("auth"));
       // const updatedPostReact = JSON.parse(localStorage.getItem("postReact")) || {};
        if (!updatedAuth) {
          // If auth is removed, logout
          dispatch(userLoggedOut());
          navigate("/");
        } else {
          // If auth is updated, log in and load the user's reactions
          dispatch(userLoggedIn({ accessToken: updatedAuth?.accessToken, user: updatedAuth?.user }));
          const updatedPostReact = JSON.parse(localStorage.getItem(`postReact_${updatedAuth?.user?._id}`));
          if (updatedPostReact) {
            dispatch(updatePostReact(updatedPostReact));
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, navigate]);

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
    // localStorage.removeItem(`reactions`);
    navigate("/login");
  };

  return { logout, authChecked };
};
