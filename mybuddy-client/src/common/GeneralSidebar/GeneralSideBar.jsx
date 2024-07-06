import { useEffect, useState } from "react";
import MobileSidebar from "./MobileSidebar";
import DekstopSidebar from "./DekstopSidebar";
import { useGetSingleUserQuery } from "../../features/auth/authApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAuthCheck } from "../../utils/useAuthCheck";
import { useNavigate } from "react-router-dom";

const GeneralSideBar = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [openFund, setOpenFund] = useState(false);
  const [openFrndRqst, setOpenFrndRqst] = useState(false);
  const [openMeet, setOpenMeet] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openRequestOption, setOpenRequestOption] = useState(false);

  const toggleState = (stateToSet, stateToReset) => {
    setTimeout(() => {
      stateToSet(true);
      stateToReset.forEach((state) => state(false));
    }, 100);
  };


  const { user } = useSelector((state) => state.auth);
  const id = user?._id


  
//  ******************** single user
const [userData, setUserData] = useState({})
const {
 data: singleUser,
 isLoading: isFetchingUser,
 error
} = useGetSingleUserQuery(id);

console.log("user",userData);

// Basic error handling example
if (error) {
 console.error("An error occurred:", error);

}

useEffect(() => {

setUserData(singleUser);

}, [singleUser]);

  const handleDashboard = () =>
    toggleState(setOpenDashboard, [
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFund,
      setOpenFrndRqst,
      setOpenMeet,
      setOpenSetting,
      setOpenProfile,
      setOpenRequestOption,
    ]);
  const handleProject = () =>
    toggleState(setOpenProject, [
      setOpenDashboard,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFund,
      setOpenFrndRqst,
      setOpenMeet,
      setOpenSetting,
      setOpenProfile,
      setOpenRequestOption,
    ]);
  const handleRequest = () =>
    toggleState(setOpenRequest, [
      setOpenDashboard,
      setOpenProject,
      setOpenCreateProject,
      setOpenFund,
      setOpenFrndRqst,
      setOpenMeet,
      setOpenSetting,
      setOpenProfile,
    ]);
  const handleCreateProject = () =>
    toggleState(setOpenCreateProject, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenFund,
      setOpenFrndRqst,
      setOpenMeet,
      setOpenSetting,
      setOpenProfile,
      setOpenRequestOption,
    ]);
  // const handleMblDashboard = () =>
  const handleFund = () =>
    toggleState(setOpenFund, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFrndRqst,
      setOpenMeet,
      setOpenSetting,
      setOpenProfile,
      setOpenRequestOption,
    ]);
  const handleFriendRqst = () =>
    toggleState(setOpenFrndRqst, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFund,
      setOpenMeet,
      setOpenSetting,
      setOpenProfile,
      setOpenRequestOption,
    ]);
  const handleMeeting = () =>
    toggleState(setOpenMeet, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFrndRqst,
      setOpenFund,
      setOpenSetting,
      setOpenProfile,
      setOpenRequestOption,
    ]);
  const handleProfile = () =>
    toggleState(setOpenProfile, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFrndRqst,
      setOpenFund,
      setOpenSetting,
      setOpenMeet,
      setOpenRequestOption,
    ]);
  const handleSetting = () =>
    toggleState(setOpenSetting, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFrndRqst,
      setOpenFund,
      setOpenMeet,
      setOpenProfile,
      setOpenRequestOption,
    ]);
    // logout
    const { logout: originalLogout } = useAuthCheck();
    const navigate = useNavigate()
    const logout = async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out!",
      });
  
      if (result.isConfirmed) {
        originalLogout();
        Swal.fire({
          icon: "success",
          text: "Logged out successfully!",
        });
        navigate("/home");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2500);
      }
    };
  return (
    <>
      <MobileSidebar
        handleCreateProject={handleCreateProject}
        handleDashboard={handleDashboard}
        handleFriendRqst={handleFriendRqst}
        handleFund={handleFund}
        handleMeeting={handleMeeting}
        handleProfile={handleProfile}
        handleProject={handleProject}
        handleRequest={handleRequest}
        handleSetting={handleSetting}
        openCreateProject={openCreateProject}
        openDashboard={openDashboard}
        openFrndRqst={openFrndRqst}
        openFund={openFund}
        openMeet={openMeet}
        openProfile={openProfile}
        openProject={openProject}
        openRequest={openRequest}
        openSetting={openSetting}
        logout={logout}
      />
      {/* from dekstop */}
      <DekstopSidebar
        handleCreateProject={handleCreateProject}
        handleDashboard={handleDashboard}
        handleFriendRqst={handleFriendRqst}
        handleFund={handleFund}
        handleMeeting={handleMeeting}
        handleProfile={handleProfile}
        handleProject={handleProject}
        handleRequest={handleRequest}
        handleSetting={handleSetting}
        setOpenRequestOption={setOpenRequestOption}
        openCreateProject={openCreateProject}
        openDashboard={openDashboard}
        openFrndRqst={openFrndRqst}
        openFund={openFund}
        openMeet={openMeet}
        openProfile={openProfile}
        openProject={openProject}
        openRequest={openRequest}
        openSetting={openSetting}
        openRequestOption={openRequestOption}
        userData={userData}
        logout={logout}
      />
    </>
  );
};

export default GeneralSideBar;
