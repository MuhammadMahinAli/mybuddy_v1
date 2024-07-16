import dashboard from "../assets/icon/dashboard.png";
import PropTypes from "prop-types";

const DashboardIcon = ({ theme }) => {
  return (
    <>
      {theme === "light" ? (
        <svg
          className="w-4 sm:w-5"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.97475 0.829224H2.82418C1.46543 0.829224 0.363953 1.93071 0.363953 3.28945V11.9002C0.363953 13.259 1.46543 14.3605 2.82418 14.3605H8.97475C10.3335 14.3605 11.435 13.259 11.435 11.9002V3.28945C11.435 1.93071 10.3335 0.829224 8.97475 0.829224Z"
            // fill={openDashboard === true || theme !== 'light' ? "#2adba4" : "#838DAA" }
          />
          <path
            d="M22.4931 0.829224H16.3425C14.9838 0.829224 13.8823 1.93071 13.8823 3.28945V6.97979C13.8823 8.33854 14.9838 9.44002 16.3425 9.44002H22.4931C23.8518 9.44002 24.9533 8.33854 24.9533 6.97979V3.28945C24.9533 1.93071 23.8518 0.829224 22.4931 0.829224Z"
            // fill={openDashboard === true || theme !== 'light' ? "#2adba4" : "#838DAA" }
          />
          <path
            d="M8.97475 16.8077H2.82418C1.46543 16.8077 0.363953 17.9092 0.363953 19.268V22.9583C0.363953 24.3171 1.46543 25.4185 2.82418 25.4185H8.97475C10.3335 25.4185 11.435 24.3171 11.435 22.9583V19.268C11.435 17.9092 10.3335 16.8077 8.97475 16.8077Z"
            // fill={openDashboard === true || theme !== 'light' ? "#2adba4" : "#838DAA" }
          />
          <path
            d="M22.4931 11.8873H16.3425C14.9837 11.8873 13.8823 12.9888 13.8823 14.3476V22.9584C13.8823 24.3171 14.9837 25.4186 16.3425 25.4186H22.4931C23.8518 25.4186 24.9533 24.3171 24.9533 22.9584V14.3476C24.9533 12.9888 23.8518 11.8873 22.4931 11.8873Z"
            // fill={openDashboard === true || theme !== 'light' ? "#2adba4" : "#838DAA" }
          />
        </svg>
      ) : (
        <img src={dashboard} className="w-4 sm:w-5" />
      )}
    </>
  );
};

export default DashboardIcon;
DashboardIcon.propTypes = {
  theme: PropTypes.string.isRequired,
};
