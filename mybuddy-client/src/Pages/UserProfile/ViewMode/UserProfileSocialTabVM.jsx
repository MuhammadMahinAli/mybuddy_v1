/* eslint-disable react/prop-types */
import { useState } from "react";
import GithubIcon from "../../../icons/GithubIcon";
import LinkedInIcon from "../../../icons/LinkedInIcon";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import instaIcon from "../../../assets/icon/instagram.png";
import TwitterIcon from "../../../icons/TwitterIcon";
import { useSelector } from "react-redux";
import ytube from "../../../assets/icon/yt.png";
import pintrst from "../../../assets/icon/pintrst.png";
import tiktok from "../../../assets/icon/tiktok.png";
import fb from "../../../assets/icon/fb.png";

const UserProfileSocialTabVM = ({ allSocialInfo }) => {

  
  const theme = useSelector((state) => state.theme.theme);
  console.log(allSocialInfo[0]);
  const [openList, setOpenlist] = useState(false);
  const currentOrcid = allSocialInfo?.orcid;
  const currentTwitter = allSocialInfo?.twitter;
  const currentGithub = allSocialInfo?.github;
  const currentResearchGate = allSocialInfo?.researchGate;
  const currentGoogleScholar = allSocialInfo?.googleScholar;
  const currentLinkedIn = allSocialInfo?.linkedIn;
  const currentInstagram = allSocialInfo?.instagram;
  const currentPersonalWebsite = allSocialInfo?.personalWebsite;
  const currentYoutube = allSocialInfo?.youtube;
  const currenTiktok = allSocialInfo?.tiktok;
  const currentPinterest = allSocialInfo?.pinterest;
  const currentFacebook = allSocialInfo?.facebook;


  return (
    <>
      <div
        className={`${
          theme !== "light" &&
          "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% md:mx-7 lg:ml-20 lg:mr-32 xl:ml-0 xl:mr-0 rounded-2xl"
        }`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-white graish"
              : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px]"
          }  rounded-2xl text-white`}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-[#edfaff] w-full"
                : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover"
            } flex justify-between items-center p-3 md:p-5 rounded-t-2xl`}
          >
            <div>
              <p className="text-[16px] md:text-2xl font-semibold">
                Social Contacts
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center  lg:justify-start">
          <div
            className={`${
              theme === "light"
                ? "bg-[#f5f5f5] border-[0.8px] border-solid border-gray shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] "
                : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
            } space-y-2 p-3 md:p-3 box-border  w-full rounded-b-xl`}
          >
            {/*  orcid */}
            {currentOrcid && (
              <div>
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
              Orc ID
                </label>
                <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                  <div
                    className={`${
                      theme !== "light" ? "bg-[#fff]" : "bg-[#fff]"
                    }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                  >
                        <img
                  className="h-[55px]"
                  src="./orcid.svg.png"
                  loading="lazy"
                  alt=""
                />
                  </div>
                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#dbf4ca] graish"
                        : "bg-[#204057] text-white"
                    } m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentOrcid}
                  </p>
                </div>
              </div>
            )}
          {/* 2 research gate */}
          {currentResearchGate && (
              <div>
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Research Gate
                </label>
                <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                  <div
                    className={`${
                      theme !== "light" ? "bg-[#fff]" : "bg-[#fff]"
                    }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                  >
                    <img
                      className="h-[40px]"
                      src="/rg.png"
                      loading="lazy"
                      alt=""
                    />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#caf4ee] graish"
                        : "bg-[#204057] text-white"
                    } m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentResearchGate}
                  </p>
                </div>
              </div>
            )}
            {/* 3 google research */}
            {currentGoogleScholar && (
              <div>
                <label
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                >
                  Google Scholar
                </label>
                <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                  <div
                    className={`${
                      theme !== "light" ? "bg-[#fff]" : "bg-[#fff]"
                    }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                  >
                    <img
                      className="h-[38px]"
                      src="/google-scholar-hd-logo.png"
                      loading="lazy"
                      alt=""
                    />
                  </div>

                  <p
                    className={`${
                      theme === "light"
                        ? "bg-[#cae4f4] graish"
                        : "bg-[#204057] text-white"
                    } m-[1px] pt-2 pl-2 md:pt-4  rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                  >
                    {currentGoogleScholar}
                  </p>
                </div>
              </div>
            )}
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

            {/* if list open */}
            {openList && (
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
                        <img
                          className="h-7 md:h-10  rounded-md"
                          src="/arrow.svg"
                        />
                      </div>

                      <p
                        className={`${
                          theme === "light"
                            ? "bg-[#cae4f4] graish"
                            : "bg-[#223055] text-white"
                        } m-[2px] pt-2 pl-2 md:pt-4 rounded-r-lg w-full  px-1 md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                      >
                         {currentPersonalWebsite?.length > 10 ? currentPersonalWebsite.slice(0,22)+".." : currentPersonalWebsite}
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
                {currenTiktok && (
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
                        {currenTiktok}
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
            )}
            {currentFacebook ||
              currenTiktok ||
              currentInstagram ||
              currentLinkedIn ||
              currentPersonalWebsite ||
              currentYoutube ||
              (currentPinterest && (
                <div
                  onClick={() => setOpenlist(!openList)}
                  className="flex justify-center items-center "
                >
                  {openList === true ? (
                    <IoIosArrowUp
                      className={theme === "light" ? "graish" : "text-white"}
                    />
                  ) : (
                    <IoIosArrowDown
                      className={theme === "light" ? "graish" : "text-white"}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileSocialTabVM;
