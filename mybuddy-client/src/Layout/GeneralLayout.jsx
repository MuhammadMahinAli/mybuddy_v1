import { Outlet, useNavigate } from "react-router-dom";
import GeneralSideBar from "../common/GeneralSidebar/GeneralSideBar";
import GeneralDashboardNavbar from "../common/Navbar/GeneralDashboardNavbar";
import { useAuthCheck } from "../utils/useAuthCheck";
import { useSelector } from "react-redux";

const GeneralLayout = () => {
  const authChecked = useAuthCheck();

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return;
  }

  return (
    <>
      {!authChecked ? (
        <div>Checking Authentication....</div>
      ) : (
        <div className="bg-[#eff4fa] w-12/12">
          <GeneralDashboardNavbar />
          <div className="flex  items-start p-3 md:pr-7 min-h-screen">
            <GeneralSideBar />
            <div className="w-10/12 md:w-11/12 lg:w-9/12 xl:w-9/12 pl-3 md:pl-8 lg:pl-5 xl:pl-8">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralLayout;
