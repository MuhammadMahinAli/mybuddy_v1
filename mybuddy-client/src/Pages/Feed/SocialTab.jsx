import GithubIcon from "../../icons/GithubIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import LinkedInIcon from "../../icons/LinkedInIcon";
import instaIcon from "../../assets/icon/instagram.png";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ytube from "../../assets/icon/yt.png";
import pintrst from "../../assets/icon/pintrst.png";
import tiktok from "../../assets/icon/tiktok.png";
import fb from "../../assets/icon/fb.png";

const SocialTab = ({ theme,user, socialInfos }) => {
  console.log("si", socialInfos);

  const userSocialInformation = socialInfos[0];

  const currentTwitter = userSocialInformation?.twitter;
  const currentGithub = userSocialInformation?.github;
  const currentLinkedIn = userSocialInformation?.linkedIn;
  const currentFacebook = userSocialInformation?.facebook;
  const currentInstagram = userSocialInformation?.instagram;
  const currentPersonalWebsite = userSocialInformation?.personalWebsite;
  const currentPinterest = userSocialInformation?.pinterest;
  const currentTiktok = userSocialInformation?.tiktok;
  const currentYoutube = userSocialInformation?.youTube;

  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const firstName = capitalize(user?.name?.firstName || "");
  const lastName = capitalize(user?.name?.lastName || "");

  const defaultSocialInfoMissingMessage = `${firstName} ${lastName} has not added any social information yet.`;
  return (
    <div
      className={`${
        theme === "light"
          ? "graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]"
          : "text-white"
      } `}
    >
      <p className="m-[1px] pt-2 md:pt-4   text-[15px] md:text-[16px] xl:text-[24px] font-semibold text-start">
        Social Info
      </p>

      {
        socialInfos?.length === 0 ?
        <p
        className={` ${
          theme === "light" ? "text-gray-700" : "text-white"
        }  text-[16px] xl:text-[20px] py-5 `}
      >
      {defaultSocialInfoMissingMessage}
      </p>
        :

        <div className="flex justify-center items-center mt-5 md:mt-7 lg:w-[600px] lg:justify-start lg:pl-10">
        <div
          className={`${
            theme === "light"
              ? "bg-[#f5f5f5] border-[0.8px] border-solid border-gray shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] "
              : "bg-[#1b1d25]"
          } space-y-2 p-3 md:p-3 box-border  w-full rounded-b-xl`}
        >
          {/* 1 twitter */}
          {currentTwitter && (
            <div>
              <label
                className={`${
                  theme === "light" ? "graish" : "text-white"
                } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
              >
                Twitter
              </label>
              <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                <div
                  className={`${
                    theme !== "light" ? "bg-[#fff]" : "bg-[#000]"
                  }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                >
                  <TwitterIcon theme={theme} />
                </div>
                <p
                  className={`${
                    theme === "light"
                      ? "bg-[#cae4f4] graish"
                      : "bg-[#204057] text-white"
                  } m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                >
                  {currentTwitter}
                </p>
              </div>
            </div>
          )}

          {/* 2 github */}
          {currentGithub && (
            <div>
              <label
                className={`${
                  theme === "light" ? "graish" : "text-white"
                } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
              >
                Github
              </label>
              <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                <div className="bg-[#1abcfe] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                  <GithubIcon />
                </div>

                <p
                  className={`${
                    theme === "light"
                      ? "bg-[#b3e4f8] graish"
                      : "bg-[#1f546d] text-white"
                  } m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-full   px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                >
                  {currentGithub}
                </p>
              </div>
            </div>
          )}

          <>
            {/* 3 linkedIn */}
            {currentLinkedIn && (
              <div>
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  LinkedIn
                </label>
                <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                  <div className="bg-[#0288d1] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                    <LinkedInIcon />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#c4dfee] graish"
                        : "bg-[#15384c] text-white"
                    } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentLinkedIn}
                  </p>
                </div>
              </div>
            )}

            {/* 4 instagram */}
            {currentInstagram && (
              <div className="">
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Instagram
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                  <div className="bg-[#ff7478] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                    <img className="h-7 md:h-10" src={instaIcon} />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#f8ced0] graish"
                        : "bg-[#613b41] text-white"
                    } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full   px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentInstagram}
                  </p>
                </div>
              </div>
            )}

            {/* 5 website */}
            {currentPersonalWebsite && (
              <div className="">
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Personal Website
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                  <div className="bg-[#4563ff] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
                    <img className="h-7 md:h-10  rounded-md" src="/arrow.svg" />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#cae4f4] graish"
                        : "bg-[#223055] text-white"
                    } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentPersonalWebsite}
                  </p>
                </div>
              </div>
            )}

            {/* 6 youtuve */}
            {currentYoutube && (
              <div className="">
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Youtube
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                  <div className="bg-[#FF0000] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
                    <img className="h-3 md:h-5 rounded-md" src={ytube} />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#ffd5d7] graish"
                        : "bg-[#223055] text-white"
                    } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentYoutube}
                  </p>
                </div>
              </div>
            )}

            {/* 7 tiktok */}
            {currentTiktok && (
              <div className="">
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Tiktok
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                  <div className="bg-[#ff8f8f] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
                    <img className="h-3 md:h-7 rounded-md" src={tiktok} />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#ffd6d6] graish"
                        : "bg-[#223055] text-white"
                    } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentTiktok}
                  </p>
                </div>
              </div>
            )}

            {/* 8 pinterest*/}
            {currentPinterest && (
              <div className="">
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Pinterest
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                  <div className="bg-[#bd2125] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
                    <img className="h-3 md:h-7 rounded-md" src={pintrst} />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#f2d3d3] graish"
                        : "bg-[#223055] text-white"
                    } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentPinterest}
                  </p>
                </div>
              </div>
            )}

            {/* 8 fb*/}
            {currentFacebook && (
              <div className="">
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Facebook
                </label>
                <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                  <div className="bg-[#4563ff] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
                    <img className="h-3 md:h-7 rounded-md" src={fb} />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#dae0ff] graish"
                        : "bg-[#223055] text-white"
                    } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentFacebook}
                  </p>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
      }

    
    </div>
  );
};

export default SocialTab;
// <div
//           data-aos="fade-down"
//           data-aos-duration="1500" className="flex justify-center items-center md:-mt-5 lg:w-[900px] lg:justify-start lg:pl-10">
//         <div
//           className={`${theme === 'light' ? "bg-[#f5f5f5] border-[0.8px] border-solid border-gray shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] " :"bg-[#24272f]" } my-4 md:my-9  xs:w-[250px] md:w-[500px] lg:w-[400px] xl:w-[500px]  space-y-4 p-3 md:p-8 box-border  rounded-xl`}
//         >
//           {/* 1 */}
//           <div>
//             <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
//               Twitter
//             </label>
//             <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-3">
//               <div className="bg-[#1da1f2] rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
//                 <TwitterIcon />
//               </div>
//
//               <p className={`${theme === 'light' ? "bg-[#cae4f4]":"bg-[#204057]"} m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px] md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
//                 @summenurfatema
//               </p>
//             </div>
//           </div>
//           {/* 2 */}
//           <div>
//             <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
//               Github
//             </label>
//             <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-3">
//               <div className="bg-[#1abcfe] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
//                 <GithubIcon />
//               </div>
//
//               <p className={`${theme === 'light' ? "bg-[#b3e4f8]":"bg-[#1f546d]"} m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]   px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
//                 @summenurfatema
//               </p>
//             </div>
//           </div>
//           {/* 3 */}
//           <div>
//             <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
//               LinkedIn
//             </label>
//             <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-3">
//               <div className="bg-[#0288d1] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
//                 <LinkedInIcon />
//               </div>
//
//               <p className={`${theme === 'light' ? "bg-[#c4dfee]":"bg-[#15384c]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
//                 @summenurfatema
//               </p>
//             </div>
//           </div>
//           {/* 4 */}
//           <div className="hidden md:block">
//             <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
//               Instagram
//             </label>
//             <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
//               <div className="bg-[#ff7478] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
//                 <img className="h-7 md:h-10" src={instaIcon} />
//               </div>
//
//               <p className={`${theme === 'light' ? "bg-[#f8ced0]":"bg-[#613b41]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]   px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
//                 @summenurfatema
//               </p>
//             </div>
//           </div>
//           {/* 5 */}
//           <div className="hidden md:block">
//             <label className="text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
//               Personal Website
//             </label>
//             <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
//               <div className="bg-[#4563ff] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
//                 <img className="h-7 md:h-10  rounded-md" src="/arrow.svg" />
//               </div>
//
//               <p className={`${theme === 'light' ? "bg-[#cae4f4]":"bg-[#223055]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
//                 @summenurfatema
//               </p>
//             </div>
//           </div>
//           {/* for mobile only */}
//           {openList && (
//             <>
//               <div className="md:hidden">
//                 <label className="text-sm font-semibold">
//                   Instagram
//                 </label>
//                 <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
//                   <div className="bg-[#ff7478] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
//                     <img className="h-7 md:h-10" src={instaIcon} />
//                   </div>
//
//                   <p className={`${theme === 'light' ? "bg-[#f8ced0]":"bg-[#613b41]"} m-[2px] pt-2 pl-2 md:pt-4  rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
//                     @summenurfatema
//                   </p>
//                 </div>
//               </div>
//
//               <div className="md:hidden">
//                 <label className="text-sm font-semibold">
//                   Personal Website
//                 </label>
//                 <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-3">
//                   <div className="bg-[#4563ff] flex justify-center items-center h-9 w-10 md:h-14 md:w-14 rounded-l-lg">
//                     <img className="h-7 md:h-10  rounded-md" src="/arrow.svg" />
//                   </div>
//
//                   <p className={`${theme === 'light' ? "bg-[#cae4f4]":"bg-[#223055]"} m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-[140px] xs:w-[230px] md:w-[350px]  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}>
//                     @summenurfatema
//                   </p>
//                 </div>
//               </div>
//             </>
//           )}
//           <div
//             onClick={() => setOpenlist(!openList)}
//             className="flex justify-center items-center md:hidden"
//           >
//             {openList === true ? <IoIosArrowUp /> : <IoIosArrowDown />}
//           </div>
//         </div>
//       </div>
//
