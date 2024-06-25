import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";

const TabletNavbar = ({ activeTab, toggleTab, theme }) => {
  return (
    <div className="md:flex hidden lg:hidden justify-between items-center">
      {/* left */}
      <div className="flex items-center space-x-1 xs:space-x-2">
        <img
          src="https://source.unsplash.com/150x150/?portrait?3"
          alt=""
          className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12  mx-auto rounded-full aspect-square"
        />
        {/* Slider */}
        <div className={` hidden md:block lg:hidden`}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className={`${
              theme === "light" ? "bg-transparent" : "bg-transparent"
            } mySwiper  h-[40px] md:w-[240px] lg:w-[250px]`}
          >
            <SwiperSlide>
              <div
                className={`${
                  theme === "light" ? "bg-transparent" : "border-blur-lg"
                } flex justify-around px-2 pt-1`}
              >
                {/* description button */}
                {theme === "light" ? (
                  <div
                    onClick={() => toggleTab("description")}
                    className={`${
                      activeTab === "description"
                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                    } cursor-pointer rounded-[27px] bg-[#d0f5fe]  border-[2px] border-solid px-4 py-1 flex justify-center items-center`}
                  >
                    <p className="graish text-sm lg:text-[15px]  font-semibold">
                      Description
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={() => toggleTab("description")}
                    className="relative  flex flex-col items-center "
                  >
                    {activeTab === "description" && (
                      <div className="absolute top-[40%] w-11/12 h-[12px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#e7687d] rounded-t-xl blur-[4px]" />
                    )}
                    <p className="cursor-pointer text-sm  rounded-[27px] px-3 py-[7px] text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(10px)] box-border">
                      Description
                    </p>
                  </div>
                )}
                {/* skill button */}
                {theme === "light" ? (
                  <div
                    onClick={() => toggleTab("skill")}
                    className={`${
                      activeTab === "skill"
                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                    } cursor-pointer rounded-[27px] bg-[#fde4f7]  border-[2px] border-solid px-4 py-1 flex justify-center items-center`}
                  >
                    <p className="graish text-sm lg:text-[15px] font-semibold">
                      All Skills
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={() => toggleTab("skill")}
                    className="relative  flex flex-col items-center "
                  >
                    {activeTab === "skill" && (
                      <div className="absolute top-[40%]  w-11/12 h-[12px] shadow-[0px_0px_5px_#AA62F9,_0px_0px_15px_#AA62F9,_0px_0px_30px_#AA62F9,_0px_0px_60px_#AA62F9] rounded-3xs bg-[#AA62F9] rounded-t-xl blur-[7px]" />
                    )}
                    <p className="cursor-pointer text-sm  rounded-[27px] px-3 py-[7px] text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(10px)] box-border">
                      All Skills
                    </p>
                  </div>
                )}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-around px-2 pt-1">
                {/* skill button */}
                {theme === "light" ? (
                  <div
                    onClick={() => toggleTab("project")}
                    className={`${
                      activeTab === "project"
                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                    } cursor-pointer rounded-[27px] bg-[#fff0d4]   border-[2px] border-solid px-4 py-1 flex justify-center items-center`}
                  >
                    <p className="graish text-sm lg:text-[15px] font-semibold">
                      Project
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={() => toggleTab("project")}
                    className="relative  flex flex-col items-center "
                  >
                    {activeTab === "project" && (
                      <div className="absolute top-[40%]  w-11/12 h-[12px] shadow-[0px_0px_5px_#1EFF45,_0px_0px_15px_#1EFF45,_0px_0px_30px_#1EFF45,_0px_0px_60px_#1EFF45] rounded-3xs bg-[#52f05a]  rounded-t-xl blur-[7px]" />
                    )}
                    <p className="cursor-pointer text-sm  rounded-[27px] px-3 py-[7px] text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(12px)] box-border">
                      Project
                    </p>
                  </div>
                )}
                {/* skill button */}
                {theme === "light" ? (
                  <div
                    onClick={() => toggleTab("social")}
                    className={`${
                      activeTab === "social"
                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                    } cursor-pointer rounded-[27px] bg-[#e6fcce]  border-[2px] border-solid px-4 py-1 flex justify-center items-center`}
                  >
                    <p className="graish text-sm lg:text-[15px] font-semibold">
                      Social Info
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={() => toggleTab("social")}
                    className="relative  flex flex-col items-center "
                  >
                    {activeTab === "social" && (
                      <div className="absolute top-[40%]  w-11/12 h-[12px] shadow-[0px_0px_5px_#FFD83A,_0px_0px_15px_#FFD83A,_0px_0px_30px_#FFD83A,_0px_0px_60px_#FFD83A] rounded-3xs bg-[#FFD83A] rounded-t-xl blur-[9px]" />
                    )}
                    <p className="cursor-pointer text-sm  rounded-[27px] px-3 py-[7px] text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(15px)] box-border">
                      Social info
                    </p>
                  </div>
                )}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* right */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {" "}
        {/* proposal button */}
        {theme === "light" ? (
          <div
            className={`cursor-pointer rounded-[10px] bg-gradient-to-l from-[#39d6a4] to-[#04b17a]  border-solid  flex justify-center items-center`}
          >
            <p className="bg-white graish text-sm lg:text-[15px]  font-semibold px-3 rounded-[10px] py-1 m-[1px]">
              Proposal
            </p>
          </div>
        ) : (
          <p className="cursor-pointer md:text-[13px] font-medium rounded-[15px] md:py-2 px-3   text-white tracking-wider shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
            PROPOSAL
          </p>
        )}
        {/* frnd request button */}
        {theme === "light" ? (
          <div
            className={`cursor-pointer rounded-[27px] bg-gradient-to-l from-[#39d6a4] to-[#04b17a]  px-3 py-1  flex justify-center items-center`}
          >
            <p className="text-white text-sm lg:text-[15px] font-semibold">
              Friend Request
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2">
            <div className="w-5 md:w-7 h-[4px] md:h-[5px] shadow-[0px_0px_5px_#0cfc34,_0px_0px_15px_#0cfc34,_0px_0px_30px_#0cfc34,_0px_0px_60px_#0cfc34] rounded-3xs bg-[#1eff45] rounded-t-xl blur-[1px]" />
            <p className="text-[13px] rounded-2xl py-1 md:py-3 md:px-3 tracking-wide text-white font-bold shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
              FRIEND REQUEST
            </p>
            <div className="w-5 md:w-7 h-[4px] md:h-[5px] shadow-[0px_0px_5px_#1eff45,_0px_0px_15px_#1eff45,_0px_0px_30px_#1eff45,_0px_0px_60px_#1eff45] rounded-3xs bg-[#1eff45] rounded-b-xl blur-[1px]" />
          </div>
        )}
        <div
          className={`${
            theme === "light" ? "bg-red-200" : "border border-[#9370DB]"
          } rounded-[8px] py-2 px-3 flex justify-center items-center`}
        >
          <FaHeart className="text-lg font-semibold text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TabletNavbar;
