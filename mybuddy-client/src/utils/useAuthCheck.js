import {useState} from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {userLoggedIn, userLoggedOut} from "../features/auth/authSlice";


export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
   
      const auth = JSON.parse(localStorage.getItem("auth"));
      if(auth){
         dispatch(userLoggedIn({accessToken: auth?.accessToken, user: auth?.user}));
      }
    
    setAuthChecked(true);
  }, [dispatch]);

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };
  return {logout, authChecked};
};

