import GithubIcon from "../../icons/GithubIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import LinkedInIcon from "../../icons/LinkedInIcon";
import instaIcon from "../../assets/icon/instagram.png";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SocialTab = ({theme}) => {
  const [openList, setOpenlist] = useState(false);
  return (
    <div  className={`${theme === 'light' ? "graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]":"text-white"} `}>
      <p className="m-[1px] pt-2 md:pt-4   text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
        Social Info
      </p>
      <div 
          data-aos="fade-down"
          data-aos-duration="1500" className="flex justify-center items-center md:-mt-5 lg:w-[900px] lg:justify-start lg:pl-10">
        <div
          className={`${theme === 'light' ? "bg-[#f5f5f5] border-[0.8px] border-solid border-gray shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] " :"bg-[#24272f]" } my-4 md:my-9  xs:w-[250px] md:w-[500px] lg:w-[400px] xl:w-[500px]  space-y-4 p-3 md:p-8 box-border  rounded-xl`}
        >
          {/* 1 */}
          <div>
            <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
              Twitter
            </label>
            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-3">
              <div className="bg-[#1da1f2] rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                <TwitterIcon />
              </div>

              <p className={`${theme === 'light' ? "bg-[#cae4f4]":"bg-[#204057]"} m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px] md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
                @summenurfatema
              </p>
            </div>
          </div>
          {/* 2 */}
          <div>
            <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
              Github
            </label>
            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-3">
              <div className="bg-[#1abcfe] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                <GithubIcon />
              </div>

              <p className={`${theme === 'light' ? "bg-[#b3e4f8]":"bg-[#1f546d]"} m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]   px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
                @summenurfatema
              </p>
            </div>
          </div>
          {/* 3 */}
          <div>
            <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
              LinkedIn
            </label>
            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-3">
              <div className="bg-[#0288d1] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                <LinkedInIcon />
              </div>

              <p className={`${theme === 'light' ? "bg-[#c4dfee]":"bg-[#15384c]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
                @summenurfatema
              </p>
            </div>
          </div>
          {/* 4 */}
          <div className="hidden md:block">
            <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
              Instagram
            </label>
            <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
              <div className="bg-[#ff7478] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                <img className="h-7 md:h-10" src={instaIcon} />
              </div>

              <p className={`${theme === 'light' ? "bg-[#f8ced0]":"bg-[#613b41]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]   px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
                @summenurfatema
              </p>
            </div>
          </div>
          {/* 5 */}
          <div className="hidden md:block">
            <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
              Personal Website
            </label>
            <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
              <div className="bg-[#4563ff] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
                <img className="h-7 md:h-10  rounded-md" src="/arrow.svg" />
              </div>

              <p className={`${theme === 'light' ? "bg-[#cae4f4]":"bg-[#223055]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
                @summenurfatema
              </p>
            </div>
          </div>
          {/* for mobile only */}
          {openList && (
            <>
              <div className="md:hidden">
                <label className="text-sm font-semibold">
                  Instagram
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
                  <div className="bg-[#ff7478] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                    <img className="h-7 md:h-10" src={instaIcon} />
                  </div>

                  <p className={`${theme === 'light' ? "bg-[#f8ced0]":"bg-[#613b41]"} m-[2px] pt-2 pl-2 md:pt-4  rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
                    @summenurfatema
                  </p>
                </div>
              </div>

              <div className="md:hidden">
                <label className="text-sm font-semibold">
                  Personal Website
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
                  <div className="bg-[#4563ff] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
                    <img className="h-7 md:h-10  rounded-md" src="/arrow.svg" />
                  </div>

                  <p className={`${theme === 'light' ? "bg-[#cae4f4]":"bg-[#223055]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
                    @summenurfatema
                  </p>
                </div>
              </div>
            </>
          )}
          <div
            onClick={() => setOpenlist(!openList)}
            className="flex justify-center items-center md:hidden"
          >
            {openList === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialTab;
