import { useState } from "react";

const LandingNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="absolute top-1 w-full px-10">
      {/* nav */}
      <header
        className={`hidden rounded-full shadow-[0px_1px_12px_1px_rgba(255,_255,_255,_0.35)] rounded-41xl bg-gray-800 lg:flex flex-col items-center justify-center pt-1 pl-[5px] pb-[5px] box-border top-[0] z-[99] sticky max-w-full text-left text-xl text-white`}
      >
        <div className="flex flex-row items-center justify-center  gap-[42px] max-w-full mq450:gap-[21px]">
          <div className="flex flex-row items-center justify-start">
            <img
              className="h-[45px] w-[53px] relative object-cover"
              loading="lazy"
              alt=""
              src="/image-3@2x.png"
            />
            <a className="text-sm md:text-lg relative capitalize font-black">
              research buddy
            </a>
          </div>
          <div className="h-[25px] w-[456px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border gap-[25px]  ">
            <nav className="m-0 self-stretch flex flex-row items-center justify-between gap-5 text-left text-xl text-primary-contrast font-nunito mq750:hidden">
              <a className="[text-decoration:none] relative capitalize text-lg font-bold text-cornflowerblue-100 inline-block min-w-[58px]">
                home
              </a>
              <a className="[text-decoration:none] relative capitalize text-lg font-semibold  inline-block min-w-[82px]">
                Features
              </a>
              <a className="[text-decoration:none] relative capitalize text-lg font-semibold ">
                Help
              </a>
              <a className="[text-decoration:none] relative capitalize text-lg font-semibold ">
                Feed
              </a>
              <a className="[text-decoration:none] relative capitalize text-lg font-semibold ">
                contact
              </a>
            </nav>
            {/* <img
              className="w-[57px] h-1 relative"
              loading="lazy"
              alt=""
              src="/vector-98.svg"
            /> */}
          </div>
          <button className="rounded-full cursor-pointer [border:none] py-3.5 px-[35px] bg-[transparent] shadow-[1px_2px_5px_rgba(113,_157,_255,_0.15)] rounded-7xl [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] flex flex-row items-center justify-center">
            <a className="[text-decoration:none] relative text-xl capitalize font-semibold font-nunito text-dimgray-200 text-left">
              sign up
            </a>
          </button>
        </div>
      </header>

      <div className="absolute top-1 left-0 w-full bg-gray-900 lg:hidden">
        <div className="px-4 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <a
                  href="/"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Product
                </a>
              </li>
              <li>
                <a
                  href="/"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/"
                  aria-label="Product pricing"
                  title="Product pricing"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Pricing
                </a>
              </li>
            </ul>

            <div className="flex flex-row items-center justify-start">
              <img
                className="h-[55.2px] w-[55.2px] relative object-cover"
                loading="lazy"
                alt=""
                src="/image-2@2x.png"
              />
              <b className="text-white relative capitalize text-xl">
                research buddy
              </b>
            </div>

            <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
              <li>
                <a
                  href="/"
                  aria-label="Sign in"
                  title="Sign in"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Sign up
                </a>
              </li>
            </ul>
            <div className="z-50 ml-auto lg:hidden">
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
                        <div className="flex flex-row items-center justify-start">
                          <img
                            className="h-[55.2px] w-[55.2px] relative object-cover"
                            loading="lazy"
                            alt=""
                            src="/image-2@2x.png"
                          />
                          <b className="text-gray-800 relative capitalize text-xl">
                            research buddy
                          </b>
                        </div>
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
                          <a
                            href="/"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Home
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Features
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            aria-label="Product pricing"
                            title="Product pricing"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Help
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            aria-label="Product pricing"
                            title="Product pricing"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Feed
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            aria-label="Sign in"
                            title="Sign in"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            contact
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                            aria-label="Sign up"
                            title="Sign up"
                          >
                            Sign up
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
      </div>
    </div>
  );
};

export default LandingNav;
