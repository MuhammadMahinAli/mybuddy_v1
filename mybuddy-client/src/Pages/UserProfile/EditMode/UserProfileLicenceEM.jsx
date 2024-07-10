import PlusIcon from "../../../icons/PlusIcon";
import UploadIcon2 from "../../../icons/UploadIcon2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import InternalLinkIcon from "../../../icons/InternalLinkIcon";
import AddLicenceModal from "./modals/license/AddLicenceModal";
import UpdateLicenseModal from "./modals/license/UpdateLicenseModal";

const UserProfileLicenceEM = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { getUserLicense } = useContext(AuthContext);
  const [isOpenAddLicence, setIsOpenAddLicence] = useState(false);
  const [isOpenUpdateLicence, setIsOpenUpdateLicence] = useState(false);
  const [currentLicenseId, setCurrentLicenseId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const closeUpdateLicenceModal = () => {
    setIsOpenUpdateLicence(false);
  };

  const closeAddLicenceModal = () => {
    setIsOpenAddLicence(false);
  };

  const openUpdateLicenseModal = (id) => {
    setCurrentLicenseId(id);
    setIsOpenUpdateLicence(true);
  };

  return (
    <>
      {/* for mobile tab */}
      <div
        className={`${
          theme !== "light" &&
          "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-xl md:mx-7 lg:ml-20 lg:mr-32 xl:hidden"
        }`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-white rounded-2xl shadow-xl xl:hidden pb-5"
              : "bg-[url('/gradient-background1.png')] text-white bg-no-repeat bg-cover 3xl:ml-[1px]"
          } rounded-xl lg:rounded-xl  shadow-2xl `}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-[#edfaff] rounded-t-xl"
                : "rounded-t-xl bg-[#13688a]"
            } flex justify-between items-center p-3 md:p-5 `}
          >
            <div>
              <p
                className={`${
                  theme === "light" ? "graish" : "text-white"
                } text-lg md:text-xl font-semibold`}
              >
                License & Certifications
              </p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsOpenAddLicence(true)}>
                <PlusIcon theme={theme} />
              </button>
            </div>
          </div>
          <div className="px-5">
            {/* Display the first item */}
            {getUserLicense?.data?.length > 0 && (
              <div key={getUserLicense.data[0]?._id} className="space-y-2 p-3">
                <p className=" capitalize text-[17px] font-semibold">
                  {getUserLicense.data[0]?.title}
                </p>
                <p className=" capitalize text-[16px]">
                  {getUserLicense.data[0]?.organization}
                </p>
                <p className=" capitalize text-[16px]">
                  issued {getUserLicense.data[0]?.issueDate}
                </p>
                <div className="md:w-4/12 xl:w-9/12 p-[2px]  rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]  lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
                  <a
                    href={getUserLicense.data[0]?.credentialLink}
                    target="blank"
                    className={`${
                      theme === "light" ? "bg-[#fff]" : "bg-[#13688a]"
                    } w-full flex justify-between items-center  lg:text-[14px]  rounded-[13px] font-semibold px-3 py-1 lg:px-1 lg:py-1 xl:px-4 xl:py-2`}
                  >
                    <p className="capitalize">show credentialss</p>
                    <InternalLinkIcon theme={theme} />
                  </a>
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
            )}

            {/* Display the rest of the items based on the showAll state */}
            {showAll &&
              getUserLicense?.data?.slice(1).map((c) => (
                <div key={c._id} className="py-5 border-b">
                  <div className="flex justify-between items-center">
                    <p className=" capitalize text-[17px] font-semibold">
                      {c.title}
                    </p>

                    <button onClick={() => openUpdateLicenseModal(c._id)}>
                      <UploadIcon2 theme={theme} />
                    </button>
                  </div>

                  <p className=" capitalize text-[16px]">{c.organization}</p>
                  <p className=" capitalize text-[16px]">{c.issueDate}</p>
                </div>
              ))}
            <div className="w-12/12 md:w-3/12">
              {getUserLicense?.data?.length > 1 && (
                <div onClick={() => setShowAll(!showAll)}>
                  {theme === "light" ? (
                    <div className=" flex items-center xl:space-x-1 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-1 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                      <p className="text-[13px] capitalize">
                        {showAll ? "Hide" : "Show all"} License
                      </p>
                      <FaArrowRight className="ml-2" />
                    </div>
                  ) : (
                    <div className="credintialBtn">
                      <p> {showAll ? "Hide" : "Show all"} License</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Display message if there is no License &Certification */}
            {getUserLicense?.data?.length === 0 && (
              <p className="py-7 text-[16px]">There Is No License To Show.</p>
            )}
          </div>
        </div>
      </div>
      {/* for desktop */}
      <div
        className={`${
          theme === "light"
            ? "bg-white graish rounded-2xl shadow-xl "
            : "bg-[url('/gradient-background1.png')] text-white bg-no-repeat bg-cover 3xl:ml-[1px]"
        } rounded-xl lg:rounded-3xl hidden xl:block shadow-2xl`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-[#edfaff] pb-5  "
              : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover"
          } px-4 py-3 rounded-xl`}
        >
          <div className="flex justify-between items-center   ">
            <div>
              <p className="text-lg md:text-xl xl:text-2xl font-normal">
                License & Certifications
              </p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsOpenAddLicence(true)}>
                <PlusIcon theme={theme} />
              </button>
            </div>
          </div>
          {isOpenAddLicence && (
            <AddLicenceModal
              theme={theme}
              isOpenAddLicence={isOpenAddLicence}
              closeAddLicenceModal={closeAddLicenceModal}
            />
          )}
          {isOpenUpdateLicence && (
            <UpdateLicenseModal
              theme={theme}
              isOpenUpdateLicence={isOpenUpdateLicence}
              closeUpdateLicenceModal={closeUpdateLicenceModal}
              currentLicenseId={currentLicenseId}
            />
          )}
          <>
            {/* Display the first item */}
            {getUserLicense?.data?.length > 0 && (
              <div
                key={getUserLicense.data[0]._id}
                className="border-b space-y-1 py-5"
              >
                <div className="flex justify-between items-center">
                  <p className=" capitalize text-[17px] font-semibold">
                    {getUserLicense.data[0]?.title}
                  </p>
                  <button
                    onClick={() =>
                      openUpdateLicenseModal(getUserLicense.data[0]?._id)
                    }
                  >
                    <UploadIcon2 theme={theme} />
                  </button>
                </div>

                <p className=" capitalize text-[16px]">
                  {getUserLicense.data[0]?.organization}
                </p>
                <p className=" capitalize text-[16px]">
                  issued {getUserLicense.data[0]?.issueDate}
                </p>
                <div className="md:w-4/12 xl:w-9/12 p-[2px]  rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]  lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
                  <a
                    href={getUserLicense.data[0]?.credentialLink}
                    target="blank"
                    className={`${
                      theme === "light" ? "bg-[#fff]" : "bg-[#13688a]"
                    } w-full flex justify-between items-center  lg:text-[14px]  rounded-[13px] font-semibold px-3 py-1 lg:px-1 lg:py-1 xl:px-4 xl:py-2`}
                  >
                    <p className="capitalize">show credentialss</p>
                    <InternalLinkIcon theme={theme} />
                  </a>
                </div>
              </div>
            )}

            {/* Display the rest of the items based on the showAll state */}
            {showAll &&
              getUserLicense?.data?.slice(1).map((c) => (
                <div key={c._id} className="py-5 space-y-1 border-b">
                  <div className="flex justify-between items-center">
                    <p className=" capitalize text-[17px] font-semibold">
                      {c.title}
                    </p>

                    <button onClick={() => openUpdateLicenseModal(c._id)}>
                      <UploadIcon2 theme={theme} />
                    </button>
                  </div>

                  <p className=" capitalize text-[16px]">{c.organization}</p>
                  <p className=" capitalize text-[16px]">
                    issued {c?.issueDate}
                  </p>
                  <div className="md:w-4/12 xl:w-9/12 p-[2px]  rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]  lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
                    <a
                      href={c?.credentialLink}
                      target="blank"
                      className={`${
                        theme === "light" ? "bg-[#fff]" : "bg-[#13688a]"
                      } w-full flex justify-between items-center  lg:text-[14px]  rounded-[13px] font-semibold px-3 py-1 lg:px-1 lg:py-1 xl:px-4 xl:py-2`}
                    >
                      <p className="capitalize">show credentialss</p>
                      <InternalLinkIcon theme={theme} />
                    </a>
                  </div>
                </div>
              ))}
            {getUserLicense?.data?.length > 1 && (
              <div onClick={() => setShowAll(!showAll)}>
                {theme === "light" ? (
                  <div className=" flex items-center xl:space-x-1 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-1 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                    <p className="text-[13px] capitalize">
                      {showAll ? "Hide" : "Show all"} License
                    </p>
                    <FaArrowRight />
                  </div>
                ) : (
                  <div className="credintialBtn">
                    <p> {showAll ? "Hide" : "Show all"} License</p>
                  </div>
                )}
              </div>
            )}
            {/* Display message if there is no experience */}
            {getUserLicense?.data?.length === 0 && (
              <p className="py-7 text-[16px]">There Is No License To Show.</p>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UserProfileLicenceEM;
