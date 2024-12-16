import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
const LandingNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); // Get the current route
  const { singleUser } = useContext(AuthContext);
  console.log(singleUser);
  console.log("pi", user);
  const handleScroll = () => {
    window.scrollBy({
      top: 1280,
      left: 0,
      behavior: "smooth",
    });
  };
  const handleScrollTab = () => {
    window.scrollBy({
      top: 920,
      left: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };
  const handleScrollMbl = () => {
    window.scrollBy({
      top: 480,
      left: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };
  return (
    <div className="absolute top-1 lg:top-5 w-full px-10">
      {/* nav */}
      <header
        className={`hidden rounded-full shadow-[0px_1px_12px_1px_rgba(255,_255,_255,_0.35)] rounded-41xl bg-gray-800 lg:flex flex-col items-center justify-center pt-1 pl-[5px] pb-[5px] box-border top-[0] z-[99] sticky max-w-full text-left text-xl text-white`}
      >
        <div className="w-full px-1 flex items-center justify-between ">
          <Link to="/" className="flex flex-row items-center justify-start">
            <img
              className="h-[45px] w-[53px] relative object-cover"
              loading="lazy"
              alt=""
              src="/image-3@2x.png"
            />
            <a className="text-sm md:text-lg relative capitalize font-black">
              research buddy
            </a>
          </Link>
          <div className="h-[25px]  flex flex-col items-start justify-start  ">
            <nav className="m-0 self-stretch flex flex-row items-center justify-between space-x-5 xl:space-x-10 ">
              <Link
                to={user ? "/home" : "/login"}
                className={`${
                  location.pathname === "/"
                    ? "text-blue-500"
                    : "text-cornflowerblue-100"
                } hover:text-blue-500 cursor-pointer [text-decoration:none] relative capitalize text-lg font-bold inline-block min-w-[58px]`}
              >
                home
              </Link>
              <p
                onClick={handleScroll}
                className={`${
                  location.pathname === "/feature"
                    ? "text-blue-500"
                    : "text-cornflowerblue-100"
                } hover:text-blue-500 cursor-pointer [text-decoration:none] relative capitalize text-lg font-semibold  inline-block min-w-[82px]`}
              >
                Features
              </p>
              <Link
                to="/help"
                className={`${
                  location.pathname === "/help"
                    ? "text-blue-500"
                    : "text-cornflowerblue-100"
                } hover:text-blue-500 cursor-pointer [text-decoration:none] relative capitalize text-lg font-semibold `}
              >
                Help
              </Link>
              <Link
                to={user ? "/home" : "/login"}
                className={`${
                  location.pathname === "/home"
                    ? "text-blue-500"
                    : "text-cornflowerblue-100"
                } hover:text-blue-500 cursor-pointer [text-decoration:none] relative capitalize text-lg font-semibold `}
              >
                Feed
              </Link>
              <p
                className={`${
                  location.pathname === "/contact"
                    ? "text-blue-500"
                    : "text-cornflowerblue-100"
                } hover:text-blue-500 cursor-pointer [text-decoration:none] relative capitalize text-lg font-semibold `}
              >
                contact
              </p>
            </nav>
          </div>
          <button className="rounded-full cursor-pointer [border:none] py-3.5 px-[35px] bg-[transparent] shadow-[1px_2px_5px_rgba(113,_157,_255,_0.15)] rounded-7xl [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] flex flex-row items-center justify-center">
            <Link
              to="/sign-up"
              className="[text-decoration:none] relative text-xl capitalize font-semibold font-nunito text-dimgray-200 text-left"
            >
              sign up
            </Link>
          </button>
        </div>
      </header>

      <div className="absolute top-1 left-0 w-full bg-gray-900 lg:hidden">
        <div className="px-2 py-1  md:px-4 lg:px-8">
          <div className="relative flex flex-row md:flex-row-reverse items-center justify-between">
            <button className="hidden md:block rounded-xl cursor-pointer [border:none] py-2 px-5 text-lg capitalize bg-[transparent] shadow-[1px_2px_5px_rgba(113,_157,_255,_0.15)]  [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] flex flex-row items-center justify-center">
              <Link to="/sign-up">sign up</Link>
            </button>
            <Link to="/" className="flex flex-row items-center justify-start">
              <img
                className="h-[55.2px] w-[55.2px] relative object-cover"
                loading="lazy"
                alt=""
                src="/image-2@2x.png"
              />
              <b className="text-white relative capitalize text-xl">
                research buddy
              </b>
            </Link>

            <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
              <li>
                <a
                  href="/login"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Sign in
                </a>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                  sign up
                </Link>
              </li>
            </ul>

            <div className="z-50  lg:hidden">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="w-5 text-white" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Link
                          to="/"
                          className="flex flex-row items-center justify-start"
                        >
                          <img
                            className="h-[55.2px] w-[55.2px] relative object-cover"
                            loading="lazy"
                            alt=""
                            src="/image-2@2x.png"
                          />
                          <b className="text-gray-800 relative capitalize text-xl">
                            research buddy
                          </b>
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg
                            className="w-5 text-gray-600"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className="space-y-4">
                        <li>
                          <Link
                            to={user ? "/home" : "/login"}
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Home
                          </Link>
                        </li>
                        <li className="md:hidden" onClick={handleScrollMbl}>
                          <p className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                            Features
                          </p>
                        </li>
                        <li
                          className="hidden md:block"
                          onClick={handleScrollTab}
                        >
                          <p className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                            Features
                          </p>
                        </li>
                        <li>
                          <Link
                            to="/help"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Help
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={user ? "/home" : "/login"}
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Feed
                          </Link>
                        </li>
                        <li>
                          <p className="font-medium capitalize tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                            contact
                          </p>
                        </li>
                        <li>
                          <button className=" md:hidden rounded-xl cursor-pointer [border:none] py-2 w-full text-lg font-bold capitalize bg-[transparent] shadow-[1px_2px_5px_rgba(113,_157,_255,_0.15)]  [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] flex flex-row items-center justify-center">
                            <Link to="/sign-up">sign up</Link>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
