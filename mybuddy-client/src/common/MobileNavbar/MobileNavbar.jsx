import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import feedWhiteBorder from "../../assets/home/feed-w-b.png";
import feedDarkBorder from "../../assets/home/feed-d-b.png";

const MobileNavbar = ({
  activeTab,
  toggleTab,
  user,
  theme,
  sentFriendRequest,
}) => {
  return (
    <div className="flex md:hidden justify-between items-center w-full">
      <div className="flex items-center space-x-1 xs:space-x-2">
        <div className="relative">
          <img
            src={
              user?.profilePic
                ? user?.profilePic
                : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
            }
            loading="lazy" alt=""
            className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 p-[3px] mx-auto rounded-full aspect-square"
          />
          <img
            className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 absolute top-0  md:right-0"
            src={theme === "light" ? feedDarkBorder : feedWhiteBorder}
            loading="lazy" alt="dashedborder"
          />
        </div>
        {/* slider */}
        <div className="">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper h-[40px] w-[130px] xs:w-[160px] "
          >
            <SwiperSlide>
              {/* skill button */}
              {theme === "light" ? (
                <div
                  onClick={() => toggleTab(user?._id, "description")}
                  className={`${
                    activeTab[user?._id] === "description"
                      ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                      : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                  } cursor-pointer rounded-[27px] bg-[#d0f5fe] border-[2px] border-solid px-4 py-1 mx-5 mt-1 flex justify-center items-center`}
                >
                  <p className="graish text-sm md:text-lg font-semibold">
                    Description
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => toggleTab(user?._id, "description")}
                  className="relative  flex flex-col items-center py-2"
                >
                  {activeTab[user?._id] === "description" && (
                    <div className="absolute top-[40%] w-7/12 md:w-9/12 h-[8px] lg:h-[12px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#e7687d] rounded-t-xl blur-[7px]" />
                  )}
                  <p className="cursor-pointer text-sm  rounded-[27px] py-1 px-3  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(100px)] box-border">
                    Description
                  </p>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide>
              {/* skill button */}
              {theme === "light" ? (
                <div
                  onClick={() => toggleTab(user?._id, "skill")}
                  className={`${
                    activeTab[user?._id] === "skill"
                      ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                      : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                  } cursor-pointer rounded-[27px] bg-[#fde4f7] border-[2px] border-solid px-4 py-1 mx-5 mt-1 flex justify-center items-center`}
                >
                  <p className="graish text-sm md:text-lg font-semibold">
                    All Skills
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => toggleTab(user?._id, "skill")}
                  className="relative  flex flex-col items-center py-2"
                >
                  {activeTab[user?._id] === "skill" && (
                    <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[8px] lg:h-[12px] shadow-[0px_0px_5px_#AA62F9,_0px_0px_15px_#AA62F9,_0px_0px_30px_#AA62F9,_0px_0px_60px_#AA62F9] rounded-3xs bg-[#AA62F9] rounded-t-xl blur-[20px]" />
                  )}{" "}
                  <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(100px)]  box-border">
                    All Skills
                  </p>
                </div>
              )}
            </SwiperSlide>

            <SwiperSlide>
              {/* button */}
              {theme === "light" ? (
                <div
                  onClick={() => toggleTab(user?._id, "project")}
                  className={` ${
                    activeTab[user?._id] === "project"
                      ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                      : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                  } cursor-pointer rounded-[27px] bg-[#fff0d4]  border-[2px] border-solid px-4 py-1 mx-5 mt-1 flex justify-center items-center`}
                >
                  <p className="graish text-sm md:text-lg font-semibold">
                    Project
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => toggleTab(user?._id, "project")}
                  className="relative  flex flex-col items-center py-2"
                >
                  {activeTab[user?._id] === "project" && (
                    <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[8px] lg:h-[12px] shadow-[0px_0px_5px_#1EFF45,_0px_0px_15px_#1EFF45,_0px_0px_30px_#1EFF45,_0px_0px_60px_#1EFF45] rounded-3xs bg-[#52f05a] rounded-t-xl blur-[20px]" />
                  )}{" "}
                  <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(100px)]  box-border">
                    Project
                  </p>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide>
              {/* skill button */}
              {theme === "light" ? (
                <div
                  onClick={() => toggleTab(user?._id, "social")}
                  className={`${
                    activeTab[user?._id] === "social"
                      ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                      : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                  } cursor-pointer rounded-[27px] bg-[#e6fcce] border-[2px] border-solid px-4 py-1 mx-5 mt-1 flex justify-center items-center`}
                >
                  <p className="graish text-[11px] xs:text-sm md:text-lg font-semibold">
                    Social Info
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => toggleTab(user?._id, "social")}
                  className="relative  flex flex-col items-center py-2"
                >
                  {activeTab[user?._id] === "social" && (
                    <div className="absolute top-[40%] w-7/12 md:w-9/12 h-[8px] lg:h-[12px] shadow-[0px_0px_5px_#FFD83A,_0px_0px_15px_#FFD83A,_0px_0px_30px_#FFD83A,_0px_0px_60px_#FFD83A] rounded-3xs bg-[#FFD83A] rounded-t-xl blur-[20px]" />
                  )}{" "}
                  <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(100px)]  box-border">
                    Social info
                  </p>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide>
              {/* skill button */}
              {theme === "light" ? (
                <div
                  className={`cursor-pointer rounded-[10px] bg-gradient-to-l from-[#39d6a4] to-[#04b17a]  border-solid  flex justify-center items-center mx-5 mt-1`}
                >
                  <p className="bg-white graish text-sm md:text-lg font-semibold w-full text-center rounded-[10px] py-1 m-[1px]">
                    Proposal
                  </p>
                </div>
              ) : (
                <p className="text-white text-sm  font-semibold text-center rounded-[10px] py-1 mx-5 mt-1  shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
                  Proposal
                </p>
              )}
            </SwiperSlide>
            <SwiperSlide>
              {/* skill button */}
              {theme === "light" ? (
                <div
                  onClick={() => sentFriendRequest(user)}
                  className={`cursor-pointer rounded-[27px] bg-gradient-to-l from-[#39d6a4] to-[#04b17a]  px-3 py-1 mx-5 mt-1 flex justify-center items-center`}
                >
                  <p className="text-white text-[10px] xs:text-sm md:text-lg text-center font-semibold">
                    Friend Request
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => sentFriendRequest(user)}
                  className="flex flex-col items-center py-[5px]"
                >
                  <div className="w-5 h-[3px] md:h-[5px] shadow-[0px_0px_5px_#0cfc34,_0px_0px_15px_#0cfc34,_0px_0px_30px_#0cfc34,_0px_0px_60px_#0cfc34] rounded-3xs bg-[#1eff45] rounded-t-xl blur-[1px]" />
                  <p className="text-white text-[10px]  font-semibold text-center rounded-[10px] py-1 px-3  shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
                    FRIEND REQUEST
                  </p>
                  <div className="w-5 h-[3px] md:h-[5px] shadow-[0px_0px_5px_#0cfc34,_0px_0px_15px_#0cfc34,_0px_0px_30px_#0cfc34,_0px_0px_60px_#0cfc34] rounded-3xs bg-[#1eff45] rounded-t-xl blur-[1px]" />
                </div>
              )}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div
        className={`${
          theme === "light" ? "bg-red-200" : "border border-[#9370DB]"
        } rounded-[8px] py-1 px-2 flex justify-center items-center`}
      >
        <FaHeart className="text-lg font-semibold text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default MobileNavbar;
