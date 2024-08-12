import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";

const MobileSidebar = ({
  handleCreateProject,
  handleDashboard,
  handleFriendRqst,
  handleFund,
  handleMeeting,
  handleProfile,
  handleProject,
  handleRequest,
  handleSetting,
  openCreateProject,
  openDashboard,
  openFrndRqst,
  openFund,
  openMeet,
  openProfile,
  openProject,
  openRequest,
  openSetting,
  logout
}) => {
  const{singleUser} = useContext(AuthContext);
  const userImage = singleUser?.data?.profilePic ?  singleUser?.data?.profilePic  : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
  return (
    <div className="hidden md:block lg:hidden flex flex-col  border-2  w-[60px] md:w-[70px]  bg-[#dce2ea] rounded-xl">
      <div className="flex flex-col  rounded-xl py-2 mx-1 w-[50px] md:w-[60px]">
        <ul className="">
          {/* hmbrgr */}
          <li
            className={`hide-content"
              border-b  cursor-pointer  relative `}
          >
            <div
              className={`bg-[#e4ecf7] py-3
                 flex relative lg:space-x-3 xl:space-x-6 rounded-t-xl items-center justify-center`}
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
          {/* project */}
          <li
            onClick={handleProject}
            className={`${
              openProject === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openProject && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openProject === true
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
                openProject === true ? "block" : "hidden"
              } bg-[#e4ecf7] h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* request */}
          <li
            onClick={handleRequest}
            className={`${
              openRequest === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openRequest && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openRequest === true
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
                openRequest === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* create project */}
          <li
            onClick={handleCreateProject}
            className={`${
              openCreateProject === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openCreateProject && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openCreateProject === true
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
                openCreateProject === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* fund */}
          <li
            onClick={handleFund}
            className={`${
              openFund === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openFund && (
              <div className=" bg-[#e4ecf7]h-4 rounded-br-[60px]"></div>
            )}

            <Link
            to='/dashboard/fund-proposal'
              className={`${
                openFund === true ? "bg-[#f3f6f8] rounded-[20px] py-2" : "bg-[#e4ecf7] py-3"
              } flex relative  items-center justify-center`}
            >
              <img src="/fund2.svg" className="h-6 md:h-5" />
            </Link>

            <div
              className={`${
                openFund === true ? "block" : "hidden"
              } bg-[#e4ecf7] h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* frnd rqst*/}
          <li
            onClick={handleFriendRqst}
            className={`${
              openFrndRqst === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openFrndRqst && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openFrndRqst === true
                  ? "bg-[#f3f6f8] rounded-[20px]  py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative items-center justify-center`}
            >
              <Link to="/dashboard/friend-request">
                <img src="/rqst2.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openFrndRqst === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* meet */}
          <li
            onClick={handleMeeting}
            className={`${
              openMeet === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openMeet && (
              <div className=" bg-[#e4ecf7]] h-4 rounded-br-[60px]"></div>
            )}

            <Link
            to="/dashboard/meeting-schedule"
              className={`${
                openMeet === true ? "bg-[#f3f6f8] rounded-[20px] py-3" : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <img src="/video.svg" className="h-3" />
            </Link>

            <div
              className={`${
                openMeet === true ? "block" : "hidden"
              } bg-[#e4ecf7]]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* profile */}
          <li
            onClick={handleProfile}
            className={`${
              openProfile === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openProfile && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openProfile === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              < Link to='/user/edit-profile'> 
              <img src={userImage} className="h-6 w-7 rounded-full" />
              </Link>

            </div>

            <div
              className={`${
                openProfile === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* setting */}
          <li
            onClick={handleSetting}
            className={`${
              openSetting === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openSetting && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openSetting === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <img src="/setting.svg" className="h-5" />
            </div>

            <div
              className={`${
                openSetting === true ? "block" : "hidden"
              } bg-[#e4ecf7] h-4 rounded-tr-[50px]`}
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

export default MobileSidebar;
MobileSidebar.propTypes = {
  handleCreateProject: PropTypes.func.isRequired,
  handleDashboard: PropTypes.func.isRequired,
  handleFriendRqst: PropTypes.func.isRequired,
  handleFund: PropTypes.func.isRequired,
  handleMeeting: PropTypes.func.isRequired,
  handleProfile: PropTypes.func.isRequired,
  handleProject: PropTypes.func.isRequired,
  handleRequest: PropTypes.func.isRequired,
  handleSetting: PropTypes.func.isRequired,
  openCreateProject: PropTypes.bool.isRequired,
  openDashboard: PropTypes.bool.isRequired,
  openFrndRqst: PropTypes.bool.isRequired,
  openFund: PropTypes.bool.isRequired,
  openMeet: PropTypes.bool.isRequired,
  openProfile: PropTypes.bool.isRequired,
  openProject: PropTypes.bool.isRequired,
  openRequest: PropTypes.bool.isRequired,
  openSetting: PropTypes.bool.isRequired,
  openRequestOption: PropTypes.bool.isRequired,
  setOpenRequestOption: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}
