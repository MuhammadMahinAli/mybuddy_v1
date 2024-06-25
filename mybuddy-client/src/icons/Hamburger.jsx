

const Hamburger = ({ theme }) => {
  return (
    <>
      {theme === "light" ? (
        <svg
          className="w-8 md:w-12 lg:w-12 py-[9px] md:py-4"
          viewBox="0 0 72 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58.0704 28.2H49.6193H58.0704ZM12.998 28.2H38.3512H12.998Z"
            fill="url(#paint0_linear_120_76)"
          />
          <path
            d="M58.0704 28.2H49.6193M12.998 28.2H38.3512"
            stroke="#3A3B3C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M12.998 42.6557H21.4491H12.998ZM58.0704 42.6557H32.7172H58.0704Z"
            fill="url(#paint1_linear_120_76)"
          />
          <path
            d="M12.998 42.6557H21.4491M58.0704 42.6557H32.7172"
            stroke="#3A3B3C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M12.998 13.7441H21.449M58.0704 13.7441H32.7171"
            stroke="#1C274C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_120_76"
              x1="35.5342"
              y1="28.2"
              x2="35.5342"
              y2="29.2"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.64" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_120_76"
              x1="35.5342"
              y1="42.6557"
              x2="35.5342"
              y2="43.6557"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.64" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          className="w-8 md:w-12 lg:w-12 py-[9px] md:py-4"
          viewBox="0 0 54 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_120_75)">
            <path
              d="M8.68335 13.1053H15.5012M45.0452 13.1053H24.5916"
              stroke="url(#paint0_linear_120_75)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M8.68335 35.8309H15.5012M45.0452 35.8309H24.5916"
              stroke="url(#paint1_linear_120_75)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M45.0452 24.4686H38.2273M8.68335 24.4686H29.1369"
              stroke="url(#paint2_linear_120_75)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_120_75"
              x="-4"
              y="0"
              width="62"
              height="55"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_120_75"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_120_75"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_120_75"
              x1="8.68335"
              y1="13.6053"
              x2="45.0452"
              y2="13.6053"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.735" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_120_75"
              x1="45.0452"
              y1="36.3309"
              x2="8.68335"
              y2="36.3309"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.735" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_120_75"
              x1="8.68335"
              y1="24.9686"
              x2="45.0452"
              y2="24.9686"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.735" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </>
  );
};

export default Hamburger;
