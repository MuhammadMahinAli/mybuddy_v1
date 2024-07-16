import { RxExternalLink } from "react-icons/rx";
import PropTypes from "prop-types";

const InternalLinkIcon = ({ theme }) => {
  return (
    <div>
      {theme === "light" ? (
        <RxExternalLink className="text-xl" />
      ) : (
        <svg
          width="21"
          height="19"
          viewBox="0 0 21 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.2026 3.89706L9.85474 9.25684"
            stroke="url(#paint0_linear_37_462)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.0907 8.99651L18.8506 3.60715C18.8796 3.51834 18.8277 3.43758 18.7349 3.42699L13.1021 2.78418"
            stroke="url(#paint1_linear_37_462)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.4012 3.85254H1.48291V17.8525H15.4829V12.0361"
            stroke="url(#paint2_linear_37_462)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_37_462"
              x1="8.30426"
              y1="10.2063"
              x2="19.2276"
              y2="3.4664"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.7" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_37_462"
              x1="14.9731"
              y1="1.58287"
              x2="12.8385"
              y2="10.017"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.7" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_37_462"
              x1="8.48291"
              y1="3.85254"
              x2="8.48291"
              y2="17.8525"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4EEBFF" />
              <stop offset="0.7" stopColor="#AA62F9" />
              <stop offset="1" stopColor="#F857FF" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default InternalLinkIcon;
InternalLinkIcon.propTypes = {
  theme: PropTypes.string.isRequired,
};
