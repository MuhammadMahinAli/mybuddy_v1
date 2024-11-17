import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useAuthCheck } from "../../utils/useAuthCheck";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import AdminDekstopSidebar from "./AdminDekstopSidebar";
import AdminMobileSidebar from "./AdminMobileSidebar";

const AdminSideBar = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openAllUser, setOpenAllUser] = useState(false);
  const [openAllProject, setOpenAllProject] = useState(false);
  const [openAllFund, setOpenAllFund] = useState(false);
  // const [openFund, setOpenFund] = useState(false);
  // const [openFrndRqst, setOpenFrndRqst] = useState(false);
  // const [openMeet, setOpenMeet] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  // const [openProfile, setOpenProfile] = useState(false);
  // const [openRequestOption, setOpenRequestOption] = useState(false);
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
      setOpenAllFund,
      setOpenAllProject,
      setOpenAllUser,
      setOpenSetting
    ]);
  const handleAllFund = () =>
    toggleState(setOpenAllFund, [
      setOpenDashboard,
      setOpenAllUser,
      setOpenAllProject,
      setOpenSetting
    ]);
  const handleAllProject = () =>
    toggleState(setOpenAllProject, [
      setOpenDashboard,
      setOpenAllUser,
      setOpenAllFund,
      setOpenSetting
    ]);
  const handleAllUser = () =>
    toggleState(setOpenAllUser, [
      setOpenDashboard,
      setOpenAllFund,
      setOpenAllProject,
      setOpenSetting
    ]);
  const handleSetting = () =>
    toggleState(setOpenSetting , [
      setOpenAllUser,
      setOpenDashboard,
      setOpenAllFund,
      setOpenAllProject,
      
    ]);
  // const handleMblDashboard = () =>
  // const handleFund = () =>
  //   toggleState(setOpenFund, [
  //     setOpenDashboard,
  //     setOpenProject,
  //     setOpenRequest,
  //     setOpenCreateProject,
  //     setOpenFrndRqst,
  //     setOpenMeet,
  //     setOpenSetting,
  //     setOpenProfile,
  //     setOpenRequestOption,
  //   ]);
  // const handleFriendRqst = () =>
  //   toggleState(setOpenFrndRqst, [
  //     setOpenDashboard,
  //     setOpenProject,
  //     setOpenRequest,
  //     setOpenCreateProject,
  //     setOpenFund,
  //     setOpenMeet,
  //     setOpenSetting,
  //     setOpenProfile,
  //     setOpenRequestOption,
  //   ]);
  // const handleMeeting = () =>
  //   toggleState(setOpenMeet, [
  //     setOpenDashboard,
  //     setOpenProject,
  //     setOpenRequest,
  //     setOpenCreateProject,
  //     setOpenFrndRqst,
  //     setOpenFund,
  //     setOpenSetting,
  //     setOpenProfile,
  //     setOpenRequestOption,
  //   ]);
  // const handleProfile = () =>
  //   toggleState(setOpenProfile, [
  //     setOpenDashboard,
  //     setOpenProject,
  //     setOpenRequest,
  //     setOpenCreateProject,
  //     setOpenFrndRqst,
  //     setOpenFund,
  //     setOpenSetting,
  //     setOpenMeet,
  //     setOpenRequestOption,
  //   ]);
  // const handleSetting = () =>
  //   toggleState(setOpenSetting, [
  //     setOpenDashboard,
  //     setOpenProject,
  //     setOpenRequest,
  //     setOpenCreateProject,
  //     setOpenFrndRqst,
  //     setOpenFund,
  //     setOpenMeet,
  //     setOpenProfile,
  //     setOpenRequestOption,
  //   ]);
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
      <AdminMobileSidebar
        handleAllUser={handleAllUser}
        handleAllProject={handleAllProject}
        handleAllFund={handleAllFund}
        handleDashboard={handleDashboard}
        handleSetting={handleSetting}
        openSetting={openSetting}
        openDashboard={openDashboard}
        openAllUser={openAllUser}
        openAllProject={openAllProject}
        openAllFund={openAllFund}
        logout={logout}
        userData={userData}
      />
      {/* from dekstop */}
      <AdminDekstopSidebar
          handleAllUser={handleAllUser}
          handleAllProject={handleAllProject}
          handleAllFund={handleAllFund}
          handleDashboard={handleDashboard}
          handleSetting={handleSetting}
          openSetting={openSetting}
          openDashboard={openDashboard}
          openAllUser={openAllUser}
          openAllProject={openAllProject}
          openAllFund={openAllFund}
          logout={logout}
          userData={userData}
      />
    </>
  );
};

export default AdminSideBar;
