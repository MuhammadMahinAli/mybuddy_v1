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
  const [openCreateTools, setOpenCreateTools] = useState(false);
  const [openAllTool, setOpenAllTool] = useState(false);
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
      setOpenSetting,
      setOpenCreateTools,
      setOpenAllTool,
    ]);
  const handleAllFund = () =>
    toggleState(setOpenAllFund, [
      setOpenDashboard,
      setOpenAllUser,
      setOpenAllProject,
      setOpenSetting,
      setOpenCreateTools,
      setOpenAllTool,
    ]);
  const handleAllProject = () =>
    toggleState(setOpenAllProject, [
      setOpenDashboard,
      setOpenAllUser,
      setOpenAllFund,
      setOpenSetting,
      setOpenCreateTools,
      setOpenAllTool,
    ]);
  const handleAllUser = () =>
    toggleState(setOpenAllUser, [
      setOpenDashboard,
      setOpenAllFund,
      setOpenAllProject,
      setOpenSetting,
      setOpenCreateTools,
      setOpenAllTool,
    ]);
  const handleSetting = () =>
    toggleState(setOpenSetting , [
      setOpenAllUser,
      setOpenDashboard,
      setOpenAllFund,
      setOpenAllProject,
      setOpenCreateTools,
      setOpenAllTool,
    ]);
  const handleCreateTools = () =>
    toggleState( setOpenCreateTools, [
      setOpenAllUser,
      setOpenDashboard,
      setOpenAllFund,
      setOpenAllProject,
      setOpenSetting ,
      setOpenAllTool,
    ]);
  const handleAllTools = () =>
    toggleState(setOpenAllTool, [
      setOpenAllUser,
      setOpenDashboard,
      setOpenAllFund,
      setOpenAllProject,
      setOpenSetting ,
      setOpenCreateTools,
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
      <AdminMobileSidebar
        handleAllUser={handleAllUser}
        handleAllProject={handleAllProject}
        handleAllFund={handleAllFund}
        handleDashboard={handleDashboard}
        handleSetting={handleSetting}
        handleCreateTools={handleCreateTools}
        handleAllTools={handleAllTools}
        openAllTool={openAllTool}
        openCreateTools={openCreateTools}
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
          handleCreateTool={handleCreateTools}
          handleAllTools={handleAllTools}
          openAllTool={openAllTool}
          openCreateTools={openCreateTools}
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
