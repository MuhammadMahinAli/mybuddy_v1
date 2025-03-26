import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingFooter = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="relative bg-transparent md:bg-white">
      <div className="hidden md:block absolute">
        <img src="./footer@2x.png" className="h-full" />
      </div>

      <div className="py-5 z-40">
        <div className=" flex flex-col items-center justify-center md:px-20 lg:px-40 xl:px-60 3xl:px-72 space-y-5">
          <h1 className="m-0 text-4xl text-center relative capitalize font-bold">
            subscribe us
          </h1>

          <p className="m-0 text-sm lg:text-lg text-center text-gray-700 z-40">
            Elevate Your Research Productivity To The Next Level. Manage Your
            Projects, Collaborate With Experts, And Stay Organized From Anywhere
            — At Your Desk Or On The Go.
          </p>
          <div className="relative xl:pt-7">
            <input className="w-[300px] md:w-[500px] lg:w-[705px] h-[30px] md:h-[40px] lg:h-[60px] [backdrop-filter:blur(42px)] rounded-31xl bg-white rounded-full border-primary-contrast border-[0.5px] border-solid box-border flex flex-col items-end justify-start " />
            <button className="absolute top-10 right-[20%]  md:right-1 md:top-1 lg:top-0 xl:top-7 rounded-full px-3 py-2 md:px-3 md:py-2 lg:py-[15px] cursor-pointer shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)]  [background:linear-gradient(-84.24deg,_#2c68ff,_#87a9ff)] flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start gap-4">
                <b className="text-white relative text-sm lg:text-lg capitalize font-nunito text-primary-contrast text-left">
                  subscribe now
                </b>
                <img
                  className="h-3 w-4 lg:w-6 relative object-contain"
                  alt=""
                  src="/vector-6.svg"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-10 md:pt-32 lg:pt-60 xl:pt-72 3xl:pt-80">
        <div className="flex flex-col md:flex-row justify-between md:items-start lg:pl-40 pl-5 md:pl-10">
          {/* left */}
          <div className="w-[257px] md:w-5/12 lg:w-4/12 flex flex-col items-start justify-start text-4xl text-gray-900">
            <div className="flex flex-row items-center justify-start">
              <img
                className="h-[55.2px] w-[55.2px] relative object-cover"
                loading="lazy"
                alt=""
                src="/image-2@2x.png"
              />
              <b className="relative capitalize text-xl">research buddy</b>
            </div>
            <div className="relative text-base capitalize text-dimgray-300">
              Empowering Researchers To Achieve More. Simplify Research
              Collaboration, Manage Tools, And Unlock Your Full Potential. Join
              Us Today To Revolutionize The Way You Conduct Research.{" "}
              <p className="">Email: <span className="lowercase">researchbdy@gmail.com</span></p>
            </div>
          </div>
          {/* right */}
          <div className="md:w-7/12 xl:w-7/12 grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 md:pt-0 md:pl-10">
            <div className="w-[150px] flex flex-col items-start justify-start py-0 pl-0 pr-0.5 box-border gap-2.5">
              <b className="relative text-mid capitalize text-dimgray-200">
                Important Links
              </b>
              <Link
                to={user ? "/feed" : "/login"}
                className="[text-decoration:none] hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]"
              >
                home
              </Link>
              <Link
                to={user ? "/feed" : "/find/project"}
                className="[text-decoration:none] hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]"
              >
                Project
              </Link>
              <Link
                to="/help"
                className="[text-decoration:none] hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]"
              >
                Help
              </Link>
              <Link
                to="/contact" className="self-stretch relative hover:text-blue-500  cursor-pointer capitalize">
                Contact
              </Link>
              <Link
                to="/terms&conditions" className="self-stretch relative hover:text-blue-500  cursor-pointer capitalize">
       Terms & Conditions
              </Link>
            </div>
            <div className="w-[118px] flex flex-col items-start justify-start py-0 pl-0 pr-0.5 box-border gap-[9px]">
              <b className="self-stretch relative text-mid capitalize text-dimgray-200">
                community
              </b>
              <Link
                to={user ? "/feed" : "/login"}
                className="[text-decoration:none]  hover:text-blue-500  cursor-pointer  self-stretch relative capitalize text-[inherit]"
              >
                news feed
              </Link>
              <Link
                to={user ? "/user/edit-profile" : "/login"}
                className=" hover:text-blue-500  cursor-pointer self-stretch relative capitalize"
              >
                profile
              </Link>
              <Link
                to={user ? "/dashboard" : "/login"}
                className="[text-decoration:none]  hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]"
              >
                dashboard
              </Link>
              <Link
                to={user ? "/user/friend" : "/login"}
                className=" hover:text-blue-500  cursor-pointer self-stretch relative capitalize"
              >
                friends
              </Link>
            </div>
            <div className="w-[118px] flex flex-col items-start justify-start py-0 pl-0 pr-0.5 box-border gap-[9px]">
              <b className="self-stretch relative text-mid capitalize text-dimgray-200">
                followers
              </b>
              <a className="[text-decoration:none] hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]">
                Facebook
              </a>
              <a className="[text-decoration:none] hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]">
                twitter
              </a>
              <a
                href="https://www.linkedin.com/company/kwstechnology"
                className="[text-decoration:none] hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]"
              >
                Linkedin
              </a>
              <a
                href="https://www.youtube.com/@NFTClosetX"
                className="[text-decoration:none] hover:text-blue-500  cursor-pointer self-stretch relative capitalize text-[inherit]"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className=" flex flex-row items-center justify-center py-5 text-center text-sm ">
          <div className="w-full border-t relative capitalize pt-7">
            Copy© research buddy 2021. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
