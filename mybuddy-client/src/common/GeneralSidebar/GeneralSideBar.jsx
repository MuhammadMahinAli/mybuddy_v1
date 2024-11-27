import { useContext, useEffect, useState } from "react";
import MobileSidebar from "./MobileSidebar";
import DekstopSidebar from "./DekstopSidebar";
import Swal from "sweetalert2";
import { useAuthCheck } from "../../utils/useAuthCheck";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";

const GeneralSideBar = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [openFund, setOpenFund] = useState(false);
  const [openFrndRqst, setOpenFrndRqst] = useState(false);
  const [openMeet, setOpenMeet] = useState(false);
  const [openMyTools, setOpenMyTools] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAllPost, setOpenAllPost] = useState(false);
  const [openRequestOption, setOpenRequestOption] = useState(false);
  const [userData, setUserData] = useState({});
  const{singleUser} = useContext(AuthContext);

  const toggleState = (stateToSet, stateToReset) => {
    setTimeout(() => {
      stateToSet(true);
      stateToReset.forEach((state) => state(false));
    }, 100);
  };
 
//  ******************** single user

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
      setOpenAllPost,
      setOpenMyTools
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
      setOpenAllPost,
      setOpenMyTools
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
      setOpenAllPost,
      setOpenMyTools
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
      setOpenAllPost,
      setOpenMyTools
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
      setOpenAllPost,
      setOpenMyTools
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
      setOpenAllPost,
      setOpenMyTools
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
      setOpenAllPost,
      setOpenMyTools
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
      setOpenAllPost,
      setOpenMyTools
    ]);
  const handleMyTools = () =>
    toggleState( setOpenMyTools, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFrndRqst,
      setOpenFund,
      setOpenSetting,
      setOpenMeet,
      setOpenRequestOption,
      setOpenAllPost,
      setOpenProfile
     
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
      setOpenAllPost,
      setOpenMyTools
    ]);
  const handleAllPost = () =>
    toggleState(setOpenAllPost, [
      setOpenDashboard,
      setOpenProject,
      setOpenRequest,
      setOpenCreateProject,
      setOpenFrndRqst,
      setOpenFund,
      setOpenMeet,
      setOpenProfile,
      setOpenRequestOption,
      setOpenSetting,  
      setOpenMyTools
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
        navigate("/");
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
        handleMyTools={handleMyTools}
        handleAllPost={handleAllPost}
        openAllPost={openAllPost}
        openMyTools={openMyTools}
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
        handleMyTools={handleMyTools}
        handleAllPost={handleAllPost}
        openAllPost={openAllPost}
        openMyTools={openMyTools}
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
