import { useContext } from "react";
import darkBorder from "../../assets/home/dark-border.png";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";

const ProfileTab = ({ openProfile, logout }) => {
  const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);
  const{singleUser} = useContext(AuthContext);
  const userName = singleUser
    && singleUser?.data?.name?.firstName + " " + singleUser?.data?.name?.lastName;
  const userRole = singleUser
    && singleUser?.data?.role;

    const userProfilePic = singleUser
    && singleUser?.data?.profilePic ? singleUser?.data?.profilePic : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg" ;
  const signOut=()=>{
    logout()

  }
  return (
    <div
      data-aos={openProfile === true ? "fade-up" : "fade-down"}
      data-aos-duration="300"
      className="absolute z-50 top-14 right-5 md:top-20 md:right-10 lg:right-10 3xl:right-16 shadow-2xl w-56 py-3 px-[3px] rounded-lg bg-white"
    >
      {/* profile and button */}
      <div className="px-2">
        {/* profile image and name */}
        <div className=" flex space-x-4 items-center py-3">
          <div className="relative">
            <img
              src={userProfilePic}
              loading="lazy" alt=""
              className={`${
                theme === "light" ? "" : ""
              }  object-cover w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 p-1 xl:w-10 xl:h-10  rounded-full aspect-square  border-dashed`}
            />
            <img
              className="w-10 md:w-20 absolute top-0  md:right-0"
              src={darkBorder}
              loading="lazy" alt="dashedborder"
            />
          </div>

          <div>
            <p className="text-[16px] font-medium ">{userName}</p>
            <p className="text-[15px] text-gray-500">{userRole}</p>
          </div>
        </div>
        <a href={user? "/user/edit-profile":"/login"}>
          <button className="mb-2 py-1 w-full md:py-1 text-[14px] graish font-semibold shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)] rounded-[6px] [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)]">
            View Profile
          </button>
        </a>
      </div>
      {/* quick links 1 */}
      <div className="my-1 p-2 border-gray-400  border-t">
        <p className=" text-[12px] lg:text-[14px] capitalize font-semibold">
          account
        </p>
        <ul className="pl-3 space-y-1">
          <li className="text-[11px] text-gray-500 lg:text-[13px] capitalize font-medium">
            help
          </li>
          <li className="text-[11px] text-gray-500 lg:text-[13px] font-medium capitalize">
            language
          </li>
        </ul>
      </div>
      {/* quick links 2 */}
      <div className="my-1 p-2 border-gray-400  border-t">
        <p className="text-[12px] lg:text-[14px] capitalize font-semibold">
          meeting
        </p>
        <ul className="pl-3 space-y-1">
          <li className="text-[11px] text-gray-500 lg:text-[13px] font-medium capitalize">
            schedule
          </li>
          <li className="text-[11px] text-gray-500 lg:text-[13px] font-medium capitalize">
            timeline
          </li>
        </ul>
      </div>
      {/* quick links 3 */}
      <div className="my-1 p-2 border-gray-400  border-t">
        <p className="text-[12px] lg:text-[14px] capitalize font-semibold">
          manage
        </p>
        <ul className="pl-3 space-y-1">
          <li className="text-[11px] lg:text-[13px] text-gray-500 font-medium capitalize">
            <Link to="/home">
            post
            </Link>
          </li>
          <li className="text-[11px] lg:text-[13px] text-gray-500 font-medium capitalize">
          <Link to="/dashboard/all-projects">
            project
            </Link>
          </li>
          <li className="text-[11px] lg:text-[13px] text-gray-500 font-medium capitalize">
          <Link to="/dashboard">
            dashboard
            </Link>
          </li>
        </ul>
      </div>
      {user ? (
        <div onClick={signOut} className="my-1 p-2 border-gray-400  border-t">
          <button className="text-[12px] lg:text-[14px] capitalize font-semibold">
            Sign out
          </button>
        </div>
      ) : (
        <a
          href="/login"
          className="text-[12px] lg:text-[14px] capitalize font-semibold"
        >
          Sign in
        </a>
      )}
    </div>
  );
};

export default ProfileTab;
