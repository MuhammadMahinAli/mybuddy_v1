import { FaPlus } from "react-icons/fa";
import BtmDashboardIcon from "../../icons/BottomNavbar/BtmDashboardIcon";
import BtmProjectIcon from "../../icons/BottomNavbar/BtmProjectIcon";
import BtmResearcherIcon from "../../icons/BottomNavbar/BtmResearcherIcon";
import BtmHomeIcon from "../../icons/BottomNavbar/BtmHomeIcon";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const BottomNavbar = ({ theme }) => {
  const location = useLocation();
  const isPageActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`${
        theme === "light" ? "border-t" : "bg-black"
      } fixed  bottom-0 w-full z-50 shadow-t-xl md:hidden`}
    >
      <div
        className={`${
          theme === "light"
            ? "bg-white"
            : "bg-[url('/botton-nav-bg.png')] bg-no-repeat bg-cover "
        } px-6 py-3 flex justify-between items-center`}
      >
        {/* left */}
        <ul className="flex items-center space-x-14">
          <li>
            <Link to="/feed">
              {" "}
              <BtmHomeIcon theme={theme} isPageActive={isPageActive("/feed")} />
            </Link>
          </li>
          <li>
            <Link to="/find/researcher">
              {" "}
              <BtmResearcherIcon
                theme={theme}
                isPageActive={isPageActive("/find/researcher")}
              />
            </Link>
          </li>
        </ul>
        {/* center */}
        <div
          className={`${
            theme !== "light" &&
            "p-[1px] bg-gradient-to-r from-[#4EEBFF] -mt-8 from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-full"
          }`}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-[#2ADBA4] -mt-8"
                : "bg-[#554a52] bg-cover bg-no-repeat"
            } h-12 w-12 rounded-full flex justify-center items-center`}
          >
            <Link to="/feed">
              <FaPlus className=" text-xl text-white" />
            </Link>
          </div>
        </div>
        {/* right */}
        <ul className="flex items-center space-x-14">
          <li>
            <Link to="/find/project">
              <BtmProjectIcon
                theme={theme}
                isPageActive={isPageActive("/find/project")}
              />
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              {" "}
              <BtmDashboardIcon
                theme={theme}
                isPageActive={isPageActive("/dashboard")}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavbar;
BottomNavbar.propTypes = {
  theme: PropTypes.string.isRequired
};
