import { useState, useEffect, useContext } from "react";
import UserContext from "../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";

const SunIcon = () => {
   
    const theme = useSelector((state) => state.theme.theme);
   
   
 
   
  return (
    <span className="sun">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <defs>
          {theme === "dark" ? (
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#4eebff", stopOpacity: 1 }} />
              <stop offset="64%" style={{ stopColor: "#aa62f9", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#f857ff", stopOpacity: 1 }} />
            </linearGradient>
          ) : null}
        </defs>
        <g className="sun">
          <circle
            r="5"
            cy="12"
            cx="12"
            fill={theme === "dark" ? "url(#sunGradient)" : "#f8ff"}
          ></circle>
          <path
            d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"
            fill={theme === "dark" ? "url(#sunGradient)" : "#f857ff"}
          ></path>
        </g>
      </svg>
    </span>
  );
};


export default SunIcon;
