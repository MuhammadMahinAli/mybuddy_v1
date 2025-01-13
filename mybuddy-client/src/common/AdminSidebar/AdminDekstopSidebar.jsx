import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
const AdminDekstopSidebar = ({
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
  handleSetting,
  openSetting,
  handleCreateTools,
  openCreateTools,
  handleAllTools,
  openAllTool,
  handleAllConference,
  openConference,
  handleTutorials,
  openTutorials
}) => {
  const { singleUser } = useContext(AuthContext);
  const adminId = singleUser?.data?._id;
  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg";
  return (
    <div className="hidden xl:flex lg:relative lg:-left-1 lg:-top-20 py-4 pl-1  flex-col justify-center items-center space-y-12 lg:w-[270px]  xl:w-3/12  rounded-br-[33px] bg-[#f3f6f8] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
      <div className="w-11/12 pt-1 pl-1">
        <Link to="/home" className="inline-flex items-center ml-0 ">
          <div className="p-2 rounded-lg shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
            <img src="/logo.png" className="h-8" />
          </div>
          <span className="ml-2 text-[17px] graish font-bold tracking-wide uppercase">
            Research Buddy
          </span>
        </Link>
      </div>
      <div
        onClick={handleDashboard}
        className={`bg-[#e4ecf7] py-4
          } flex justify-around relative space-x-12 rounded-[20px] items-center py-2 px-5 lg:px-8 xl:px-7 3xl:px-10 mt-5 shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] h-[71.2px]`}
      >
        <img src="/dashboard1.svg" className="h-6" />
        <Link
          to={`/admin/${adminId}/`}
          className="lg:text-[18px] xl:text-[22px] font-semibold gray600 relative -left-5"
        >
          Dashboard
        </Link>
      </div>

      {/* top */}
      <div className="m-4 lg:w-[230px] xl:w-[230px] 2xl:w-[230px] 3xl:w-[260px] pt-2 pb-9 flex justify-center items-center rounded-[25px] bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]">
        <ul className="text-xl font-semibold relative">
          <li
            onClick={handleAllProject}
            className={`${
              openAllProject === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer  relative  mt-3 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openAllProject && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <Link
              to={`/admin/${adminId}/all-project`}
              className={`${
                openAllProject === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2 "
                  : "bg-[#e4ecf7] py-3 border-b border-white"
              } flex relative lg:space-x-2 xl:space-x-4  items-center  lg:pl-5 xl:pl-3`}
            >
              <img src="/project2.svg" className="h-7" />
              <p className="lg:text-[18px] xl:text-[22px] font-medium gray600">
                All Project
              </p>
            </Link>

            <div
              className={`${
                openAllProject === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-5 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* <li
            className={`${
              openRequestOption === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer  relative  mt-3 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openRequest && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <div
              className={`${
                openRequestOption === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2"
                  : "bg-[#e4ecf7] py-3 border-b border-white"
              } flex relative space-x-4  it items-start  pl-4 `}
            >
              <img src="/rqst.svg" className="h-5 mt-1" />
              <div
                onClick={() => {
                  handleRequest();
                }}
              >
                <p
                  onClick={() => setOpenRequestOption(!openRequestOption)}
                  className=" lg:text-[18px] xl:text-[22px] font-medium gray600"
                >
                  Request
                </p>
                {openRequestOption && (
                  <div className="pl-3 space-y-[1px] pt-1">
                    <p className="lg:text-[16px] 3xl:text-[19px] font-normal gray600">
                      <Link to="/admin/sent-request">Sent</Link>
                    </p>
                    <p className="lg:text-[16px] 3xl:text-[19px] font-normal gray600">
                      <Link to="/admin/recieve-request">Recieve</Link>
                    </p>
                  </div>
                )}
              </div>
              <img
                onClick={() => setOpenRequestOption(!openRequestOption)}
                src="/down-arrow.svg"
                className={`${
                  openRequestOption ? "right-5 top-4" : " right-5 top-6"
                } h-3 absolute`}
              />
            </div>

            <div
              className={`${
                openRequestOption === true
                  ? "block rounded-tr-[50px]"
                  : "hidden"
              } bg-[#e4ecf7]  h-5 `}
            ></div>
          </li> */}
          <li
            onClick={handleAllFund}
            className={`${
              openAllFund === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer  relative  ml-1 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openAllFund && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <Link
              to={`/admin/${adminId}/all-fund`}
              className={`${
                openAllFund === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2"
                  : "bg-[#e4ecf7] py-3 border-b border-white"
              } flex space-x-3 items-center pl-3 lg:pr-14`}
            >
              <img src="/video.svg" className="h-4" />
              <p className="lg:text-[18px] xl:text-[22px] font-medium text-xl gray600 xl:pr-5">
                All Fund
              </p>
            </Link>

            <div
              className={`${
                openAllFund === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-5 rounded-tr-[50px]`}
            ></div>
          </li>
          <li
            onClick={handleAllUser}
            className={`${
              openAllUser === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer  relative  ml-1 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openAllUser && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <Link
              to={`/admin/${adminId}/all-user`}
              className={`${
                openAllUser === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2"
                  : "bg-[#e4ecf7] py-3 border-b border-white"
              } flex space-x-3 items-center pl-3 lg:pr-14`}
            >
              <img src="/video.svg" className="h-4" />
              <p className="lg:text-[18px] xl:text-[22px] font-medium text-xl gray600 xl:pr-5">
                All User
              </p>
            </Link>

            <div
              className={`${
                openAllUser === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-5 rounded-tr-[50px]`}
            ></div>
          </li>
        </ul>
      </div>
      {/* center */}
      <div className="m-4 lg:w-[230px] xl:w-[230px] 2xl:w-[230px] 3xl:w-[260px] pt-2 pb-9 flex justify-center items-center rounded-[25px] bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]">
        <ul className="text-xl font-semibold relative">
          <li
            onClick={handleCreateTools}
            className={`${
              openCreateTools === true ? "show-content" : "hide-content"
            } border-b bg-red-700 cursor-pointer  relative  mt-3 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openCreateTools && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <Link
              to={`/admin/${adminId}/tools`}
              className={`${
                openCreateTools === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2"
                  : "bg-[#e4ecf7] w-52 border-b border-white py-3"
              } flex relative lg:space-x-2 xl:space-x-4  items-center  lg:pl-5 xl:pl-3`}
            >
              <img src="/fund2.svg" className="h-7" />
              <p className="lg:text-[18px] xl:text-[22px] font-medium gray600">
                Add Tool
              </p>
            </Link>

            <div
              className={`${
                openCreateTools === true ? "block" : "hidden"
              } bg-[#e4ecf7] w-52 h-5 rounded-tr-[50px]`}
            ></div>
          </li>
          <li
            onClick={handleAllConference}
            className={`${
              openConference === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer  relative ml-1 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openConference && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <Link
              to={`/admin/${adminId}/set-conference`}
              className={`${
                openConference === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2"
                  : "bg-[#e4ecf7] border-b border-white py-3"
              } flex relative space-x-4  items-center pl-3 `}
            >
              <img src="/rqst2.svg" className="h-6" />
              <p className="lg:text-[18px] xl:text-[22px] font-medium gray600">
                Conference
              </p>
            </Link>

            <div
              className={`${
                openConference === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-5 rounded-tr-[50px]`}
            ></div>
          </li>
          <li
            onClick={handleTutorials}
            className={`${
              openTutorials === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer  relative ml-1 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openTutorials && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <Link
              to={`/admin/${adminId}/tutorials`}
              className={`${
                openTutorials === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2"
                  : "bg-[#e4ecf7] border-b border-white py-3"
              } flex relative space-x-4  items-center pl-3 `}
            >
              <img src="/rqst2.svg" className="h-6" />
              <p className="lg:text-[18px] xl:text-[22px] font-medium gray600">
              Tutorials
              </p>
            </Link>

            <div
              className={`${
                openTutorials === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-5 rounded-tr-[50px]`}
            ></div>
          </li>
          <li
            onClick={handleAllTools}
            className={`${
              openAllTool === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer  relative  ml-1 lg:-right-[7px] xl:-right-[11px] 2xl:-right-[16px] 3xl:-right-[23px]`}
          >
            <div
              className={`${
                !openAllTool && "hidden"
              } bg-[#e4ecf7] h-5 rounded-br-[60px]`}
            ></div>

            <Link
              to={`/admin/${adminId}/all-tools`}
              className={`${
                openAllTool === true
                  ? "bg-[#f3f6f8] rounded-l-2xl py-2"
                  : "bg-[#e4ecf7] py-3"
              } flex space-x-3 items-center pl-3 pr-4`}
            >
              <img src="/video.svg" className="h-4" />
              <p className="lg:text-[18px] xl:text-[22px] font-medium text-xl gray600 xl:pr-5">
                All Tool
              </p>
            </Link>

            <div
              className={`${
                openAllTool === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-5 rounded-tr-[50px]`}
            ></div>
          </li>
        </ul>
      </div>
      {/* bottom */}
      {/* <Link
        to="/user/edit-profile"
        className={`${
          openProfile === true ? "bg-[#dce2ea]" : "bg-[#e4ecf7] py-4 "
        } flex flex-col justify-center items-center relative rounded-[15px] py-2 lg:px-[75px] xl:px-[94px] 3xl:px-[100px]    shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]`}
      >
        <img src={userImage} className="h-16 w-16 -mt-10 rounded-full" />
        <div>
          <p className="lg:text-[16px] xl:text-[20px]  font-medium gray600 text-center capitalize">
            {userData?.data?.name?.firstName}
          </p>
          <p className="lg:text-[16px] xl:text-[20px]  font-medium gray600 text-center pb-5 capitalize">
            {userData?.data?.name?.lastName}
          </p>
        </div>
      </Link> */}

      {/* setting logout */}
      <div className="space-y-3">
        <Link
          to={`/admin/${adminId}/setting`}
          onClick={handleSetting}
          className={`${
            openSetting === true ? "bg-[#dce2ea]" : "bg-[#e4ecf7] py-4"
          } flex justify-evenly relative space-x-10 rounded-[20px] items-center py-2 lg:px-[41px] xl:px-10 3xl:px-[50px] mt-5  shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] h-[71.2px]`}
        >
          <img src="/setting.svg" className="h-8" />
          <p className="lg:text-[18px] xl:text-[22px]  font-medium gray600 relative -left-5">
            Setting
          </p>
        </Link>
        <div
          onClick={logout}
          className={`${
            openDashboard === true ? "bg-[#dce2ea]" : "bg-[#e4ecf7] py-4"
          } flex justify-around relative space-x-10 cursor-pointer rounded-[20px] items-center py-2 lg:px-[41px] xl:px-10 3xl:px-[50px]  mt-5  shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] h-[71.2px]`}
        >
          <img src="/logout.svg" className="h-8" />
          <p className="lg:text-[18px] xl:text-[22px]  font-medium gray600 relative -left-5">
            Log out
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDekstopSidebar;

AdminDekstopSidebar.propTypes = {
  handleCreateProject: PropTypes.func.isRequired,
  handleDashboard: PropTypes.func.isRequired,
  handleFriendRqst: PropTypes.func.isRequired,
  handleFund: PropTypes.func.isRequired,
  handleMeeting: PropTypes.func.isRequired,
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
  userData: PropTypes.object.isRequired,
};
