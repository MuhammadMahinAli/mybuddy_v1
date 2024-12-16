import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "../utils/useAuthCheck";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Pages/Loading/Loading";
import LandingPage from "../Pages/Landing/LandingPage";
import { AuthContext } from "../Context/UserContext";

const LandingLayout = () => {
  const authChecked = useAuthCheck();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  console.log("p", user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {!authChecked ? (
        <div>Checking Authentication....</div>
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <LandingPage />
            </>
          )}
        </>
      )}
    </>
  );
};

export default LandingLayout;

//<div
//className={`transition-all ease-out duration-300 bg-no-repeat bg-cover min-h-screen ${
//  theme === "light" ? "bg-[#eaecef]" : "bg-[#070c12]"
//}`}
//>
//<Navbar
//  toggleSidebar={toggleSidebar}
//  setOpenSidebar={setOpenSidebar}
//  openSidebar={openSidebar}
//  theme={theme}
///>
//<div className="flex justify-center items-center">
//  <div className="w-11/12 py-5 ">
//    <Outlet />
//  </div>
//</div>
//{/* <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} toggleSidebar={toggleSidebar}  theme={theme} /> */}
//{/* <div className={`${openSidebar ? "w-10/12 md:w-11/12":"w-full" }`}> */}
//{/* </div> */}
//</div>
