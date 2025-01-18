import { Outlet, useNavigate } from "react-router-dom";
import GeneralSideBar from "../common/GeneralSidebar/GeneralSideBar";
import GeneralDashboardNavbar from "../common/Navbar/GeneralDashboardNavbar";
import { useAuthCheck } from "../utils/useAuthCheck";
import { useSelector } from "react-redux";

const GeneralLayout = () => {
  const authChecked = useAuthCheck();

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // if (!user) {
  //   navigate("/login");
  //   return;
  // }

  return (
    <>
      {!authChecked ? (
        <div>Checking Authentication....</div>
      ) : (
        <div className="bg-[#eff4fa] w-full min-h-screen">
          <GeneralDashboardNavbar />
          <div className="flex items-center justify-center  md:items-start p-0 md:pr-7 ">
            <GeneralSideBar />
            <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:w-9/12 pl-3 md:pl-16 lg:pl-14 xl:pl-8">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralLayout;

// import { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import GeneralSideBar from "../common/GeneralSidebar/GeneralSideBar";
// import GeneralDashboardNavbar from "../common/Navbar/GeneralDashboardNavbar";
// import { useAuthCheck } from "../utils/useAuthCheck";
// import { useSelector } from "react-redux";
// import Loading from '../Pages/Loading/Loading'

// const GeneralLayout = () => {
//   const authChecked = useAuthCheck();  // Hook to check if the user is authenticated
//   const { user } = useSelector((state) => state.auth);  // Get user from Redux store
//   const navigate = useNavigate();

//   // State for loading
//   const [loading, setLoading] = useState(true);

//   // Listen for changes in localStorage (for cross-tab logout)
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === "logout") {
//         // Redirect to login page when logout is detected
//         navigate("/");
//       }
//     };

//     // Attach the event listener
//     window.addEventListener("storage", handleStorageChange);

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, [navigate]);

//   // If no user is found and authChecked is done, redirect to login page
//   useEffect(() => {
//     if (authChecked) {
//       setLoading(false);  // Authentication check is complete, stop loading
//       if (!user) {
//         navigate("/");  // Redirect if user is not logged in
//       }
//     }
//   }, [authChecked, user, navigate]);

//   // Display loading spinner while auth is being checked
//   if (loading) {
//     return <div><Loading/> </div>;
//   }

//   return (
//     <>
//       {!authChecked ? (
//         <div>Checking Authentication....</div>  // Additional auth check message
//       ) : (
//         <div className="bg-[#eff4fa] w-full min-h-screen">
//           <GeneralDashboardNavbar />
//           <div className="flex items-center justify-center md:items-start p-0 md:pr-7 ">
//             <GeneralSideBar />
//             <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:w-9/12 pl-3 md:pl-16 lg:pl-14 xl:pl-8">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GeneralLayout;

