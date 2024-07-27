/* eslint-disable react/prop-types */
import { useState } from "react";
import DynamicSkillSection from "../../../common/DynamicSkillSecrion/DynamicSkillSection";
import RightArrowIcon from "../../../icons/RightArrowIcon";
import { useSelector } from "react-redux";

const UserProfileSkillVM = ({ allSkill }) => {
  const theme = useSelector((state) => state.theme.theme);
  const skillArray = allSkill[0]?.skillArray;
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

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
              ? "bg-white"
              : "bg-[url('/gradient-background1.png')]  bg-no-repeat bg-cover 3xl:ml-[1px]"
          }  rounded-2xl `}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-[#edfaff] graish"
                : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover text-white"
            } flex justify-between items-center p-3 md:p-5 rounded-t-2xl`}
          >
            <div>
              <p className="text-[16px] md:text-2xl font-semibold">Skills</p>
            </div>
            {/* <div className="flex items-center space-x-2">
              <PlusIcon theme={theme} />
              <UploadIcon2 theme={theme} />
            </div> */}
          </div>

          <div className=" pb-4">
            {skillArray?.length < 0 ? (
              <p
                className={`${
                  theme === "light" ? "text-gray-600" : "text-white"
                }  p-5  font-semibold text-sm md:text-lg capitalize`}
              >
                Add your skills
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 py-6 px-5  xl:px-3">
                  <DynamicSkillSection
                    isReadMoreOpen={isReadMoreOpen}
                    setIsReadMoreOpen={setIsReadMoreOpen}
                    theme={theme}
                    allSkill={allSkill}
                  />
                </div>
                {
                  allSkill[0]?.skillArray?.length > 6 &&
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
                        {isReadMoreOpen ? "View More" : "View Less"}
                        <span>
                          {" "}
                          <RightArrowIcon theme={theme} />
                        </span>{" "}
                      </p>
                    </div>
                  )}
                </div>

                }
              
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileSkillVM;
