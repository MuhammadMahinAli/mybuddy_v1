const RightArrowIcon = ({ theme }) => {
  return (
    <div>
      {theme === "light" ? (
        <svg
        className="w-4 ml-1"
          viewBox="0 0 27 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.7572 7.97624L19.0905 1.30957M25.7572 7.97624L19.0905 14.6429M25.7572 7.97624H1.7572"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className="w-4 ml-1"
          viewBox="0 0 27 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.3423 8.87174L18.6756 2.20508M25.3423 8.87174L18.6756 15.5384M25.3423 8.87174H1.34232"
            stroke="url(#paint0_linear_36_289)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_36_289"
              x1="-0.571662"
              y1="8.16582"
              x2="27.2959"
              y2="8.87174"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.69" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default RightArrowIcon;
