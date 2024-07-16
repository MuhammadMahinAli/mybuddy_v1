import b from "../assets/icon/gradient-edit.png";
import PropTypes from "prop-types";

const UploadIcon2 = ({ theme }) => {
  return (
    <div>
      {theme === "light" ? (
        <div className="lg:text-sm xl:text-lg text-white font-semibold rounded-[7px] px-2 py-2 xl:px-2 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
          <svg
            className="w-4"
            viewBox="0 0 22 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.86279 21.125V15.588L15.1509 1L20.2378 5.36574L6.94966 19.5278L1.86279 21.125Z"
              stroke="#fff"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M13.3764 6.53566L14.1162 7.20846L15.4618 5.72881L14.722 5.05601L13.3764 6.53566ZM11.9515 5.23982L13.3764 6.53566L14.722 5.05601L13.2971 3.76018L11.9515 5.23982Z"
              fill="#fff"
            />
            <path
              d="M0.112793 24.625H18.2199M19.6128 24.625H21.1128"
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
        </div>
      ) : (
        <div className="p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-md">
          <div className="bg-[#333841] rounded-md p-1">
            <img className="w-4" src={b} loading="lazy" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadIcon2;
UploadIcon2.propTypes = {
  theme: PropTypes.string.isRequired,
};
