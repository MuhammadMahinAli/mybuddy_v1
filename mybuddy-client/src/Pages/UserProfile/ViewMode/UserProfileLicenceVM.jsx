import { FaArrowRight } from "react-icons/fa";
import InternalLinkIcon from "../../../icons/InternalLinkIcon";
import { useSelector } from "react-redux";
import { useState } from "react";

const UserProfileLicenceVM = ({allLicense}) => {
  const theme = useSelector((state) => state.theme.theme);
  console.log(allLicense[0]);
  const [showAll, setShowAll] = useState(false);
  return (
    <div>
      {/* for  mobile tab*/}
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
          </div>
          <div className="px-5">
            {/* Display the first item */}
            {allLicense.length > 0 && (
              <div key={allLicense[0]?._id} className="space-y-2 p-3">
                <p className=" capitalize text-[17px] font-semibold">
                  {allLicense[0]?.title}
                </p>
                <p className=" capitalize text-[16px]">
                  {allLicense[0]?.organization}
                </p>
                <p className=" capitalize text-[16px]">
                  issued {allLicense[0]?.issueDate}
                </p>
                <div className="md:w-4/12 xl:w-9/12 p-[2px]  rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]  lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
                  <a
                    href={allLicense[0]?.credentialLink}
                    target="blank"
                    className={`${
                      theme === "light" ? "bg-[#fff]" : "bg-[#13688a]"
                    } w-full flex justify-between items-center  lg:text-[14px]  rounded-[13px] font-semibold px-3 py-1 lg:px-1 lg:py-1 xl:px-4 xl:py-2`}
                  >
                    <p className="capitalize">show credentials</p>
                    <InternalLinkIcon theme={theme} />
                  </a>
                </div>
                <hr className="pt-2" />
              </div>
            )}

            {/* Display the rest of the items based on the showAll state */}
            {showAll &&
              allLicense?.slice(1).map((c) => (
                <div key={c._id} className="pb-4 space-y-1 border-b">
                  <div className="flex justify-between items-center">
                    <p className=" capitalize text-[17px] font-semibold">
                      {c.title}
                    </p>
                  </div>
                  <p className=" capitalize text-[16px]">{c.organization}</p>
                  <p className=" capitalize text-[16px]">{c.issueDate}</p>
                  <div className="md:w-4/12 xl:w-9/12 p-[2px]  rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]  lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
                  <a
                    href={c?.credentialLink}
                    target="blank"
                    className={`${
                      theme === "light" ? "bg-[#fff]" : "bg-[#13688a]"
                    } w-full flex justify-between items-center  lg:text-[14px]  rounded-[13px] font-semibold px-3 py-1 lg:px-1 lg:py-1 xl:px-4 xl:py-2`}
                  >
                    <p className="capitalize">show credentials</p>
                    <InternalLinkIcon theme={theme} />
                  </a>
                </div>
                </div>
              ))}
            <div className="w-12/12 md:w-3/12">
              {allLicense?.length > 1 && (
                <div onClick={() => setShowAll(!showAll)}>
                  {theme === "light" ? (
                    <div className=" flex items-center xl:space-x-1 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-1 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                      <p className="text-[13px] capitalize">
                        {showAll ? "Hide" : "Show all"} Licenses & Certifications
                      </p>
                      <FaArrowRight className="ml-2" />
                    </div>
                  ) : (
                    <div className="credintialBtn">
                      <p> {showAll ? "Hide" : "Show all"} Licenses and Certifications</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Display message if there is no License &Certification */}
            {/* {allLicense?.length === 0 && (
              <p className="py-7 text-[16px]">There Is No License To Show.</p>
            )} */}
          </div>
        </div>
      </div>
      {/* for dekstop */}
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
          </div>
          <>
            {/* Display the first item */}
            {allLicense?.length > 0 && (
              <div
                key={allLicense[0]?._id}
                className="border-b space-y-1 py-5"
              >
                <div className="flex justify-between items-center">
                  <p className=" capitalize text-[17px] font-semibold">
                    {allLicense[0]?.title}
                  </p>
                </div>
                <p className=" capitalize text-[16px]">
                  {allLicense[0]?.organization}
                </p>
                <p className=" capitalize text-[16px]">
                  issued {allLicense[0]?.issueDate}
                </p>
                <div className="md:w-4/12 xl:w-9/12 p-[2px]  rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]  lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
                  <a
                    href={allLicense[0]?.credentialLink}
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
             allLicense?.slice(1).map((c) => (
                <div key={c._id} className="py-5 space-y-1 border-b">
                  <div className="flex justify-between items-center">
                    <p className=" capitalize text-[17px] font-semibold">
                      {c.title}
                    </p>
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
            {allLicense?.length > 1 && (
              <div onClick={() => setShowAll(!showAll)}>
                {theme === "light" ? (
                  <div className=" flex items-center xl:space-x-1 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-1 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                    <p className="text-[13px] capitalize">
                      {showAll ? "Hide" : "Show all"} Licenses & Certifications
                    </p>
                    <FaArrowRight />
                  </div>
                ) : (
                  <div className="credintialBtn">
                    <p> {showAll ? "Hide" : "Show all"} Licenses & Certifications </p>
                  </div>
                )}
              </div>
            )}
            {/* Display message if there is no experience */}
            {/* {allLicense?.length === 0 && (
              <p className="py-7 text-[16px]">There Is No License To Show.</p>
            )} */}
          </>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLicenceVM;