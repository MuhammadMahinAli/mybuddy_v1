import { useState } from "react";
import { Link } from "react-router-dom";

const GeneralDashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="px-2 py-5 mx-auto sm:max-w-xl md:max-w-full bg-tr md:px-8 lg:px-8 gray500">
      <div className="relative flex items-center justify-between">
        <a
          href="/home"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center"
        >
          <div className="hidden lg:block px-2 py-2 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
            <img src="/hambrgr2.svg" className="h-4" />
          </div>
          <span className="ml-2 text-2xl font-bold tracking-wide uppercase">
            LOGO
          </span>
        </a>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
            <Link to="/home">
              <p className="px-4 py-[5px] text-[18px] font-semibold rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                Home
              </p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <p className="px-4 py-[5px] text-[18px] font-semibold rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                General
              </p>
            </Link>
          </li>
          <li>
            <a href="/find/academic">
              <p className="px-4 py-[5px] text-[18px] font-semibold rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                Academic
              </p>
            </a>
          </li>
          <li>
            <div className="px-3 py-1 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <img src="/user.svg" className="h-8" />
            </div>
          </li>
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="px-2 py-1 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <img src="/user.svg" className="h-6" />
            </div>
          </button>
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="px-2 py-2 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <img src="/hambrgr2.svg" className="h-4" />
            </div>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/home"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <div className="p-3 rounded-lg shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                        <img src="/hambrgr2.svg" className="h-4" />
                      </div>
                      <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                        LOGO
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 gray600" viewBox="0 0 24 24">
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
                      <a
                        href="/home"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/home"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        General
                      </a>
                    </li>
                    <li>
                      <a
                        href="/home"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Academic
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GeneralDashboardNavbar;
