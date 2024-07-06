import { FaPlus } from "react-icons/fa";
import BtmDashboardIcon from "../../icons/BottomNavbar/BtmDashboardIcon";
import BtmProjectIcon from "../../icons/BottomNavbar/BtmProjectIcon";
import BtmResearcherIcon from "../../icons/BottomNavbar/BtmResearcherIcon";
import BtmHomeIcon from "../../icons/BottomNavbar/BtmHomeIcon";
import { useLocation } from "react-router-dom";

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
            <a href="/home">
              {" "}
              <BtmHomeIcon theme={theme} isPageActive={isPageActive("/home")} />
            </a>
          </li>
          <li>
            <a href="/find/researcher">
              {" "}
              <BtmResearcherIcon
                theme={theme}
                isPageActive={isPageActive("/find/researcher")}
              />
            </a>
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
            <a href="/home">
              <FaPlus className=" text-xl text-white" />
            </a>
          </div>
        </div>
        {/* right */}
        <ul className="flex items-center space-x-14">
          <li>
            <a href="/find/project">
              <BtmProjectIcon
                theme={theme}
                isPageActive={isPageActive("/find/project")}
              />
            </a>
          </li>
          <li>
            <a href="/dashboard">
              {" "}
              <BtmDashboardIcon
                theme={theme}
                isPageActive={isPageActive("/dashboard")}
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavbar;
