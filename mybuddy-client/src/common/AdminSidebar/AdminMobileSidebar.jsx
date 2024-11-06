import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";

const AdminMobileSidebar = ({
  handleAllUser,
  handleAllProject,
  handleAllFund,
  handleDashboard,
  openDashboard,
  openAllUser,
  openAllProject,
  openAllFund,
  logout,
  userData,
}) => {
  const { singleUser } = useContext(AuthContext);
  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg";
  return (
    <div className="hidden md:block xl:hidden flex flex-col  border-2  w-[60px] md:w-[70px]  bg-[#dce2ea] absolute -top-0 -left-0">
      <div className="flex flex-col  rounded-xl py-2 pl-2 w-[50px] md:w-[60px]">
        <ul className=" ">
          <li className="flex justify-center items-center rounded-t-xl  bg-[#e4ecf7] w-full ">
            <div className="block  py-1 px-4 lg:p-1 ">
              <img src="/logo.png" className="w-8 mt-2" />
            </div>
          </li>
          {/* hmbrgr */}
          <li
            className={`hide-content"
              border-b  cursor-pointer  relative `}
          >
            <div
              className={`bg-[#e4ecf7] py-3
                 flex relative lg:space-x-3 xl:space-x-6  items-center justify-center`}
            >
              <img src="/hambrgr1.svg" className="h-4" />
            </div>
          </li>
          {/* dashboard */}
          <li
            onClick={handleDashboard}
            className={`${
              openDashboard === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openDashboard && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openDashboard === true
                  ? "bg-[#f3f6f8] rounded-[20px] ml-2 pl-0 py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <Link to="/dashboard">
                <img src="/dashboard1.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openDashboard === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* all project */}
          <li
            onClick={handleAllProject}
            className={`${
              openAllProject === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openAllProject && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openAllProject === true
                  ? "bg-[#f3f6f8]  rounded-[20px] ml-2 pl-0 py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative items-center justify-center`}
            >
              <Link to="/dashboard/all-projects">
                <img src="/project2.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openAllProject === true ? "block" : "hidden"
              } bg-[#e4ecf7] h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* all fund */}
          <li
            onClick={handleAllFund}
            className={`${
              openAllFund === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openAllFund && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openAllFund === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <Link to="/dashboard/recieve-request">
                <img src="/rqst.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openAllFund === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* all user */}
          <li
            onClick={handleAllUser}
            className={`${
              openAllUser === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openAllUser && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openAllUser === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <Link to="/dashboard/create-projects">
                <img src="/create-project.svg" className="h-6 md:h-5" />
              </Link>
            </div>

            <div
              className={`${
                openAllUser === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* logout */}
          <li
            className={`hide-content"
              border-b  cursor-pointer  relative `}
          >
            <div
              onClick={logout}
              className={`bg-[#e4ecf7] py-3
                 flex relative lg:space-x-3 xl:space-x-6 rounded-b-xl items-center justify-center`}
            >
              <img src="/logout.svg" className="h-4" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMobileSidebar;
// AdminMobileSidebar.propTypes = {
//   handleCreateProject: PropTypes.func.isRequired,
//   handleDashboard: PropTypes.func.isRequired,
//   handleFriendRqst: PropTypes.func.isRequired,
//   handleFund: PropTypes.func.isRequired,
//   handleMeeting: PropTypes.func.isRequired,
//   handleProfile: PropTypes.func.isRequired,
//   handleProject: PropTypes.func.isRequired,
//   handleRequest: PropTypes.func.isRequired,
//   handleSetting: PropTypes.func.isRequired,
//   openAllUser: PropTypes.bool.isRequired,
//   openDashboard: PropTypes.bool.isRequired,
//   openFrndRqst: PropTypes.bool.isRequired,
//   openFund: PropTypes.bool.isRequired,
//   openMeet: PropTypes.bool.isRequired,
//   openProfile: PropTypes.bool.isRequired,
//   openAllProject: PropTypes.bool.isRequired,
//   openAllFund: PropTypes.bool.isRequired,
//   openSetting: PropTypes.bool.isRequired,
//   openRequestOption: PropTypes.bool.isRequired,
//   setOpenRequestOption: PropTypes.func.isRequired,
//   logout: PropTypes.func.isRequired,
// }
