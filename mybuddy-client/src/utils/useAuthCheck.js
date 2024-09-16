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
import { userLoggedIn, userLoggedOut } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      dispatch(userLoggedIn({ accessToken: auth?.accessToken, user: auth?.user }));
    }

    setAuthChecked(true);

    // Event listener to track changes to localStorage (e.g., login/logout from other tabs)
    const handleStorageChange = (event) => {
      if (event.key === "auth") {
        const updatedAuth = JSON.parse(localStorage.getItem("auth"));
        if (!updatedAuth) {
          // If auth is removed, logout
          dispatch(userLoggedOut());
          navigate("/");
        } else {
          // If auth is updated, log in
          dispatch(userLoggedIn({ accessToken: updatedAuth?.accessToken, user: updatedAuth?.user }));
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
    navigate("/");
  };

  return { logout, authChecked };
};
