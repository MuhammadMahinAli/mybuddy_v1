import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import { useAuthCheck } from "../utils/useAuthCheck";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Pages/Loading/Loading";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import BottomNavbar from "../common/BottomNavbar/BottomNavbar";

const MainLayout = () => {
  const authChecked = useAuthCheck();
  const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (!user) {
    navigate("/login");
    return;
  }
  

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
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div
                      className={`${
                        theme === "light" ? "bg-[#eaecef]" : "bg-[#070c12]"
                      } min-h-full`}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-1000"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-1000"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full transition-all">
                          <div
                            className={`transition-all ease-out duration-300 bg-no-repeat bg-cover min-h-screen ${
                              theme === "light"
                                ? "bg-[#eaecef]"
                                : "bg-[#070c12]"
                            }`}
                          >
                            <Navbar
                              toggleSidebar={toggleSidebar}
                              setOpenSidebar={setOpenSidebar}
                              openSidebar={openSidebar}
                              theme={theme}
                            />
                            <div className="flex justify-center items-center mb-14 md:mb-0">
                              <div className="w-11/12 py-5 ">
                                <Outlet />
                              </div>
                            </div>
                            <BottomNavbar theme={theme} />
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MainLayout;

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
