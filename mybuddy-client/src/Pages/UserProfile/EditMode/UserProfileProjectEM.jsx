import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import PlusIcon from "../../../icons/PlusIcon";
import { AuthContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";
import RightArrowIcon from "../../../icons/RightArrowIcon";

const UserProfileProjectEM = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { getAllProjectByUser } = useContext(AuthContext);
  const allProject = getAllProjectByUser?.data;
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const projectsToShow = isReadMoreOpen ? allProject : allProject?.slice(0, 6);

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
              : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px] text-white"
          } rounded-2xl `}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-[#edfaff]"
                : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover"
            } flex justify-between items-center p-3 md:p-5 rounded-t-2xl`}
          >
            <div>
              <p className="text-[16px] md:text-2xl font-semibold">Projects</p>
            </div>
            <Link to="/dashboard/create-projects">
              <PlusIcon theme={theme} />
            </Link>
          </div>
          {allProject?.length === 0 ? (
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-white"
              } py-8  font-semibold text-sm md:text-lg capitalize text-center`}
            >
              {"You've not posted any project yet."}
            </p>
          ) : (
            <>
              <div className="p-5 xl:px-5 xl:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-12 lg:gap-9 xl:gap-5">
                {projectsToShow?.map((p, i) => (
                  <div
                    key={i}
                    className={`${
                      i === 0
                        ? theme === "light"
                          ? "bg-[#fff7d8] border-[1px] rounded-[25px]"
                          : "bg-[url('/rectangle39317.png')] bg-no-repeat bg-cover rounded-b-xl text-white "
                        : i === 1
                        ? theme === "light"
                          ? "bg-[#ecf9ff] border-[1px] rounded-[25px]"
                          : "bg-[url('/rectangle39317.png')] bg-no-repeat bg-cover rounded-b-xl text-white"
                        : theme === "light"
                        ? "bg-[#feeeed] border-[1px] rounded-[25px]"
                        : "bg-[url('/rectangle39317.png')] bg-no-repeat bg-cover rounded-b-xl text-white"
                    } pb-4 space-y-1 flex flex-col justify-start shadow-[3px_-2px_5px_-5px_rgba(0,_0,_0,_0.2),_0px_3px_4px_rgba(0,_0,_0,_0.08)]  box-border  border-solid border-darkgray overflow-hidden`}
                  >
                    <div
                      className={`${
                        theme === "light"
                          ? "bg-[#fff] rounded-[25px] shadow-[3px_-2px_5px_-5px_rgba(0,_0,_0,_0.2)_inset,_0px_3px_4px_rgba(0,_0,_0,_0.08)_inset]"
                          : "bg-[#4d6366] rounded-t-xl"
                      } flex justify-center items-center h-[120px] md:h-[140px] xl:h-[180px]  `}
                    >
                      <img
                        src={p.images[0]}
                        className="h-[120px] md:h-[140px] xl:h-[180px] w-full object-cover"
                      />
                    </div>
                    <div className="px-2 xl:p-3  md:px-5 lg:py-3 space-y-1 lg:space-y-1">
                      <p className="font-semibold pb-2 text-[14px] lg:text-[15px] xl:text-xl">
                        {p.projectName.slice(0, 12)}..
                      </p>
                      <div
                        className={`${
                          theme === "light" ? "text-gray-500" : "text-white"
                        } pb-2 lg:pb-3 text-[14px] lg:text-[15px] xl:text-[15px] `}
                        dangerouslySetInnerHTML={{
                          __html: p?.description.slice(0, 40),
                        }}
                      />
                      {theme === "light" ? (
                        <button
                          className={`${
                            i % 3 === 0
                              ? "border-[#fa4f4f] text-[#fa4f4f]"
                              : i % 3 === 1
                              ? "border-orange-400 text-orange-400"
                              : "border-[#3c92c4] text-[#3c92c4]"
                          }
                      py-1 md:py-2 px-3 w-full text-sm md:text-[16px] 3xl:text-xl font-medium rounded-[10px] border `}
                        >
                          View more
                        </button>
                      ) : (
                        <>
                          <button
                            className={`${
                              i % 3 === 0
                                ? "detailsRedBtn"
                                : i % 3 === 1
                                ? "detailsYellowBtn"
                                : "detailsBlueBtn"
                            }`}
                          >
                            <p>DETAILS</p>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full pb-4 flex justify-center items-center">
                {allProject?.length > 6 && (
                  <div className="flex justify-center items-center">
                    {theme === "light" ? (
                      <div
                        onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                        className="w-36 flex items-center space-x-2 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-4 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]"
                      >
                        <p className="text-sm capitalize">
                          {" "}
                          {isReadMoreOpen ? "View More" : "View Less"}
                        </p>
                        <RightArrowIcon theme={theme} />
                      </div>
                    ) : (
                      <div
                        onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                        className="viewMoreBlueBtn"
                      >
                        <p>
                          {isReadMoreOpen ? "View More" : "View Less"}{" "}
                          <span>
                            {" "}
                            <RightArrowIcon theme={theme} />
                          </span>{" "}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileProjectEM;
