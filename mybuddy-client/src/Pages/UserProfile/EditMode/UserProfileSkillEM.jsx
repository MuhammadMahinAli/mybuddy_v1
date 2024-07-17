import { useContext, useState } from "react";
import DynamicSkillSection from "../../../common/DynamicSkillSecrion/DynamicSkillSection";
import PlusIcon from "../../../icons/PlusIcon";
import RightArrowIcon from "../../../icons/RightArrowIcon";
import UploadIcon2 from "../../../icons/UploadIcon2";
import { useSelector } from "react-redux";
import AddSkillModal from "./modals/skill/AddSkillModal";
import UpdateSkillModal from "./modals/skill/UpdateSkillModal";
import { AuthContext } from "../../../Context/UserContext";

const UserProfileSkillEM = () => {
  const theme = useSelector((state) => state.theme.theme);
  //const { user } = useSelector((state) => state.auth);
  const { getAllSkillByUser,isFetchingSkill } = useContext(AuthContext);
  const allSkill = getAllSkillByUser?.data;
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };
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
            <div className="flex items-center space-x-2">
              {allSkill?.length > 0 ? (
                <button type="button" onClick={() => setIsUpdateOpen(true)}>
                  <UploadIcon2 theme={theme} />
                </button>
              ) : (
                <button type="button" onClick={() => setIsOpen(true)}>
                  <PlusIcon theme={theme} />
                </button>
              )}
            </div>
            {isUpdateOpen && (
              <UpdateSkillModal
                allSkill={allSkill}
                isUpdateOpen={isUpdateOpen}
                closeUpdateModal={closeUpdateModal}
              />
            )}
            {isOpen && (
              <AddSkillModal isOpen={isOpen} closeModal={closeModal} />
            )}
          </div>

          <div className=" pb-4">
            {allSkill?.length === 0 ? (
              <p
                className={`${
                  theme === "light" ? "text-gray-600" : "text-white"
                } py-5 text-center font-semibold text-sm md:text-lg capitalize`}
              >
                Add your skills
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 py-6 px-5  xl:px-3">
                  <DynamicSkillSection isFetchingSkill={isFetchingSkill} theme={theme} allSkill={allSkill} />
                </div>
                <div className="flex justify-center items-center">
                  {theme === "light" ? (
                    <div className="w-36 flex items-center space-x-2 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-4 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                      <p className="text-sm capitalize">View More</p>
                      <RightArrowIcon theme={theme} />
                    </div>
                  ) : (
                    <div className="viewMoreBlueBtn">
                      <p>
                        View More{" "}
                        <span>
                          {" "}
                          <RightArrowIcon theme={theme} />
                        </span>{" "}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileSkillEM;
