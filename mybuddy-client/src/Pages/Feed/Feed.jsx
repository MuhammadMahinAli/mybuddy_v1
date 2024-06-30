import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import AboutTab from "./AboutTab";
import InterestTab from "./InterestTab";
import ProjectTab from "./ProjectTab";
import SkillTab from "./SkillTab";
import SocialTab from "./SocialTab";
import MobileNavbar from "../../common/MobileNavbar/MobileNavbar";
import TabletNavbar from "../TabletNavbar/TabletNavbar";
import { useSelector } from "react-redux";
import feedWhiteBorder from '../../assets/home/feed-w-b.png';
import feedDarkBorder from '../../assets/home/feed-d-b.png';

const Feed = () => {
  const [activeTab, setActiveTab] = useState("description");
  const theme = useSelector((state) => state.theme.theme);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
  <>
      {/* top */}
      <div className={`${theme !== 'light' && "p-[1px] ml-5 md:ml-10 xl:ml-14 3xl:ml-16 w-11/12 bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-[20px]"}`}>
      <div
        className={`${
          theme === "light"
            ? "bg-[#fff]  ml-5 md:ml-10 xl:ml-14 3xl:ml-16 shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray w-11/12"
            : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:mr-[1px] w-12/12"
        }  text-graish p-3 xl:p-5 rounded-[20px]`}
      >
        <div className="lg:flex hidden flex-col lg:flex-row justify-between items-center md:space-y-4 lg:space-y-0">
          {/* left */}
          <div className="flex justify-between items-center space-x-3 ">
            <div className="relative">
            <img
              src="https://source.unsplash.com/150x150/?portrait?3"
              alt=""
              className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 rounded-full  p-1"
            />
             <img
                className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 absolute top-0  md:right-0"
                src={theme === 'light' ? feedDarkBorder : feedWhiteBorder}
                alt="dashedborder"
              />
            </div>
         
            {/* description button */}
            {theme === "light" ? (
              <div
                onClick={() => toggleTab("description")}
                className={`${
                  activeTab === "description"
                    ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                    : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                }  cursor-pointer rounded-[27px] bg-[#d0f5fe]    border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
              >
                <p className="graish lg:text-sm xl:text-lg font-semibold">
                  Description
                </p>
              </div>
            ) : (
              <div
                onClick={() => toggleTab("description")}
                className="relative  flex flex-col items-center py-2"
              >
                {activeTab === "description" && (
                  <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[7px] lg:h-[20px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#f33d5c] rounded-t-xl blur-[1px]" />
                )}
                <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(13px)] box-border">
                  Description
                </p>
              </div>
            )}
            {/* skill button */}
            {/* description button */}
            {theme === "light" ? (
              <div
                onClick={() => toggleTab("skill")}
                className={`${
                  activeTab === "skill"
                    ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                    : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                }  cursor-pointer rounded-[27px] bg-[#fde4f7] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
              >
                <p className="graish lg:text-sm xl:text-lg font-semibold">
                  All Skills
                </p>
              </div>
            ) : (
              <div
                onClick={() => toggleTab("skill")}
                className="relative  flex flex-col items-center py-2"
              >
                {activeTab === "skill" && (
                  <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#AA62F9,_0px_0px_15px_#AA62F9,_0px_0px_30px_#AA62F9,_0px_0px_60px_#AA62F9] rounded-3xs bg-[#AA62F9] rounded-t-xl blur-[12px]" />
                )}{" "}
                <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(0px)]  box-border">
                  All Skills
                </p>
              </div>
            )}
            {/* project tab */}
            {theme === "light" ? (
              <div
                onClick={() => toggleTab("project")}
                className={`${
                  activeTab === "project"
                    ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                    : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                }  cursor-pointer rounded-[27px] bg-[#fff0d4]    border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
              >
                <p className="graish lg:text-sm xl:text-lg font-semibold">
                  Project
                </p>
              </div>
            ) : (
              <div
                onClick={() => toggleTab("project")}
                className="relative  flex flex-col items-center py-2"
              >
                {activeTab === "project" && (
                  <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[12px] shadow-[0px_0px_5px_#1EFF45,_0px_0px_15px_#1EFF45,_0px_0px_30px_#1EFF45,_0px_0px_60px_#1EFF45] rounded-3xs bg-[#52f05a] rounded-t-xl blur-[10px]" />
                )}{" "}
                <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(10px)]  box-border">
                  Project
                </p>
              </div>
            )}
            {/* social button */}
            {theme === "light" ? (
              <div
                onClick={() => toggleTab("social")}
                className={`${
                  activeTab === "social"
                    ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                    : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                }  cursor-pointer rounded-[27px] bg-[#e6fcce]   border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
              >
                <p className="graish lg:text-sm xl:text-lg font-semibold">
                  Social info
                </p>
              </div>
            ) : (
              <div
                onClick={() => toggleTab("social")}
                className="relative  flex flex-col items-center py-2"
              >
                {activeTab === "social" && (
                  <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#FFD83A,_0px_0px_15px_#FFD83A,_0px_0px_30px_#FFD83A,_0px_0px_60px_#FFD83A] rounded-3xs bg-[#FFD83A] rounded-t-xl blur-[10px]" />
                )}{" "}
                <p className="cursor-pointer text-sm xl:text-[16px]  rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(10px)]  box-border">
                  Social info
                </p>
              </div>
            )}
          </div>
          {/* right */}

          {/* social button */}

          <div className="flex justify-between items-center space-x-3">
            {theme === "light" ? (
              <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
                  Proposal
                </button>
              </div>
            ) : (
              <p className="cursor-pointer text-sm lg:text-[14px] font-medium rounded-[15px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
                PROPOSAL
              </p>
            )}
            {/* friend request button */}
            {theme === "light" ? (
              <div className="lg:text-sm xl:text-lg text-white font-semibold rounded-[13px] px-3 py-2 xl:px-4 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                Friend Request
              </div>
            ) : (
              // <div className="flex flex-col items-center py-2">
              //   <div className="w-5 md:w-7 h-[4px] md:h-[5px] shadow-[0px_0px_5px_#0cfc34,_0px_0px_15px_#0cfc34,_0px_0px_30px_#0cfc34,_0px_0px_60px_#0cfc34] rounded-3xs bg-[#1eff45] rounded-t-xl blur-[1px]" />
              //   <p className="text-sm rounded-2xl py-1 md:py-3 px-4 md:px-7 tracking-wide text-white font-bold shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
              //     FRIEND REQUEST
              //   </p>
              //   <div className="w-5 md:w-7 h-[4px] md:h-[5px] shadow-[0px_0px_5px_#1eff45,_0px_0px_15px_#1eff45,_0px_0px_30px_#1eff45,_0px_0px_60px_#1eff45] rounded-3xs bg-[#1eff45] rounded-b-xl blur-[1px]" />
              // </div>
              <button className="friendRequestBtn"><p >FRIEND REQUEST</p></button>
            )}

            <div
              className={`${
                theme === "light" ? "bg-red-200" : "border border-[#9370DB]"
              } rounded-[11px] px-3 py-2 xl:px-3 xl:py-2 flex justify-center items-center`}
            >
              <FaHeart className="text-2xl font-semibold text-red-500 cursor-pointer" />
            </div>
          </div>
        </div>
        <div>
          {/* mobile navbar end */}
          <MobileNavbar activeTab={activeTab} toggleTab={toggleTab} theme={theme} />
          {/* tab navbar start*/}
          <TabletNavbar activeTab={activeTab} toggleTab={toggleTab} theme={theme} />
          {/* tab navbar end*/}
        </div>
        {activeTab === "description" && <AboutTab theme={theme} />}
        {activeTab === "project" && <ProjectTab theme={theme} />}
        {activeTab === "social" && <SocialTab theme={theme} />}
        {activeTab === "skill" && <SkillTab theme={theme} />}
        {activeTab === "interest" && <InterestTab theme={theme} />}
      </div>
      </div>
      </>
  
  );
};

export default Feed;

// const Group = () => {
//   return (
//     <div className="w-full relative h-[44.1px] text-left text-[18px] text-lightslategray font-nunito">
//       <div className="absolute top-[0px] left-[0px] shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset] rounded-[49px] bg-lightcyan w-[127.5px] h-[44.1px]" />
//       <div className="absolute top-[9.8px] left-[14.2px] capitalize font-semibold inline-block w-[117.4px] h-[18.9px]">
//         description
//       </div>
//     </div>
//   );
// };
//
// export default Group;
// const Group = () => {
//   return (
//     <div className="w-full relative h-[44.1px] text-left text-[18px] text-lightslategray font-nunito">
//       <div className="absolute top-[0px] left-[0px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-[49px] bg-lavender w-[108.3px] h-[44.1px]" />
//       <div className="absolute top-[9.8px] left-[18.4px] capitalize font-semibold inline-block w-[84.4px] h-[18.9px]">
//         all skills
//       </div>
//     </div>
//   );
// };
//
// export default Group;
