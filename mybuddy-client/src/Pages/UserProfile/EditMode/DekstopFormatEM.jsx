import UploadIcon2 from "../../../icons/UploadIcon2";
import UserProfileProjectEM from "./UserProfileProjectEM";
import UserProfileSocialTabEM from "./UserProfileSocialTabEM";
import UserProfileSkillEM from "./UserProfileSkillEM";
import UserProfileActivityEM from "./UserProfileActivityEM";
import UserProfileExperienceEM from "./UserProfileExperienceEM";
import UserProfileLicenceEM from "./UserProfileLicenceEM";
import { useSelector } from "react-redux";

const DekstopFormatEM = ({getAllProjectByUser,singleUser}) => {
  
  const theme = useSelector((state) => state.theme.theme);
  const skillArray = ["react", "tailwind", "html", "kubernetes"];
  return (
    <div
      className={`${
        theme === "light" ? "graish" : "text-white"
      } xl:flex justify-between items-start py-7 px-20 hidden `}
    >
      {/* left */}
      <div className="w-4/12 lg:mr-8 space-y-7">
        <div
          className={`${
            theme !== "light" &&
            "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-2xl "
          }`}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-white"
                : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px]"
            }  rounded-2xl   space-y-4 p-3 md:p-5`}
          >
            {/* <div className="w-4/12 rounded-2xl mr-8 bg-white space-y-4 p-3 md:p-5"> */}
            {/* kws */}
            

            {/* Experience */}
            {/* <div
            className={`${
              theme === "light"
                ? "bg-[#edfaff]"
                : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover"
            } px-4 py-3 rounded-xl`}
          >
            <div className="flex justify-between items-center   ">
              <div>
                <p className="text-lg md:text-xl xl:text-2xl font-normal">
                  Experience
                </p>
              </div>
              <div className="flex space-x-2">
                <PlusIcon theme={theme} />
                <span>
           
                  <UploadIcon2 theme={theme} />
                </span>
              </div>
            </div>
            <div className="space-y-2 pt-7">
              <p className=" capitalize text-[17px] font-semibold">
                founder and chief executive officer
              </p>
              <p className=" capitalize text-[16px]">KWS . self employed</p>
              <p className=" capitalize text-[16px]">
                june 2022 - present . 1 year 9 mos
              </p>
              <p className=" capitalize text-[16px]">helped me got this job</p>
              <p className=" capitalize text-[16px]">
                web service and security
              </p>
            </div>
          </div> */}
            <UserProfileExperienceEM theme={theme} />
            {/* lisecnce */}
            {/* <div
            className={`${
              theme === "light"
                ? "bg-[#edfaff]"
                : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover"
            } px-4 py-3 rounded-xl`}
          >
            <div className="flex justify-between items-center   ">
              <div>
                <p className="text-lg md:text-xl xl:text-2xl capitalize font-normal grish">
                  licenses and certificates
                </p>
              </div>
              <div className="flex space-x-2">
                <PlusIcon theme={theme} />
                <span>
                  {" "}
                  <UploadIcon2 theme={theme} />
                </span>
              </div>
            </div>
            <div className="space-y-2 pt-7">
              <p className=" capitalize text-[17px] font-semibold">
                finalist in international blockchain olympiad amsterdam
              </p>
              <p className=" capitalize text-[16px]">
                international blockchain olympiad (IBCOL)
              </p>
              <p className=" capitalize text-[16px]">issued nov 2023</p>
              <div className="xl:w-9/12 p-[2px]  rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]  lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
                <button
                  className={`${
                    theme === "light" ? "bg-[#fff]" : "bg-[#13688a]"
                  } w-full flex justify-between items-center  lg:text-[14px]  rounded-[13px] font-semibold  lg:px-1 lg:py-1 xl:px-4 xl:py-2`}
                >
                  <p className="capitalize">show credential</p>
                  <InternalLinkIcon theme={theme} />
                </button>
              </div>
              <hr className="pt-2" />

              {theme === "light" ? (
                <div className=" flex items-center xl:space-x-1 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-1 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                  <p className="text-[13px] capitalize">
                    show all 41 licenses and certifications
                  </p>
                  <FaArrowRight />
                </div>
              ) : (
                <div className="credintialBtn">
                  <p>show all 41 licenses and certifications</p>
                </div>
              )}
            </div>
          </div> */}
            <UserProfileLicenceEM theme={theme} />
          </div>
        </div>
        <UserProfileSocialTabEM theme={theme} />
      </div>

      {/* right */}
      <div className=" xl:w-9/12 3xl:w-10/12 space-y-7">
        {/* activities */}
        <UserProfileActivityEM singleUse={singleUser} theme={theme} />
        {/* projects */}

        <UserProfileProjectEM singleUse={singleUser} getAllProjectByUser={getAllProjectByUser} theme={theme} />
        <UserProfileSkillEM skillArray={skillArray} theme={theme} />

        {/* </div> */}
      </div>
    </div>
  );
};

export default DekstopFormatEM;
