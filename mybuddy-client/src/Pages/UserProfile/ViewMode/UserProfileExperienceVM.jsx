/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const UserProfileExperienceVM = ({allExperience}) => {
  const theme = useSelector((state) => state.theme.theme);
  const [showAll, setShowAll] = useState(false);
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
                Experience
              </p>
            </div>
          </div>
          <div className="px-5">
            {/* Display the first item */}
            {allExperience?.length > 0 && (
              <div
                key={allExperience[0]?._id}
                className="border-b py-5 space-y-1"
              >
                  <p className=" capitalize text-[17px] font-semibold">
                    {allExperience[0]?.role}
                  </p>
                <p className=" capitalize text-[16px]">
                  {allExperience[0]?.companyName},{" "}
                  {allExperience[0]?.companyLocation}
                </p>
                {allExperience[0]?.endDate === "Currently Working" ? (
                  <p className=" capitalize text-[16px]">
                    {allExperience[0]?.endDate} as{" "}
                    {allExperience[0]?.employeeType}
                  </p>
                ) : (
                  <p className=" capitalize text-[16px]">
                    {allExperience[0]?.startDate}{" "}
                    {allExperience[0]?.endDate}
                  </p>
                )}
                {allExperience[0]?.endDate !== "Currently Working" && (
                  <p className=" capitalize text-[16px]">
                    Worked as {allExperience[0]?.employeeType}
                  </p>
                )}
              </div>
            )}

            {/* Display the rest of the items based on the showAll state */}
            {showAll &&
              allExperience?.slice(1).map((c) => (
                <div key={c?._id} className="py-5 border-b">
            
                    <p className=" capitalize text-[17px] font-semibold">
                      {c?.role}
                    </p>
                  <p className=" capitalize text-[16px]">
                    {c?.companyName}, {c?.companyLocation}
                  </p>
                  {c?.endDate === "Currently Working" ? (
                    <p className=" capitalize text-[16px]">
                      {c?.endDate} as {c?.employeeType}
                    </p>
                  ) : (
                    <p className=" capitalize text-[16px]">
                      {"("} {c?.startDate}
                      {"-"} {c?.endDate} {")"}
                    </p>
                  )}

                  {c?.endDate !== "Currently Working" && (
                    <p className=" capitalize text-[16px]">
                      Worked as {c?.employeeType}
                    </p>
                  )}
                </div>
              ))}
            <div className="w-12/12 md:w-3/12">
              {allExperience?.length > 1 && (
                <div onClick={() => setShowAll(!showAll)}>
                  {theme === "light" ? (
                    <div className=" flex items-center xl:space-x-1 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-1 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                      <p className="text-[13px] capitalize">
                        {showAll ? "Hide" : "Show all"} experiences
                      </p>
                      <FaArrowRight className="ml-2" />
                    </div>
                  ) : (
                    <div className="credintialBtn">
                      <p> {showAll ? "Hide" : "Show all"} experiences</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Display message if there is no experience */}
            {/* {allExperience?.length === 0 && (
              <p className="py-7 text-[16px]">
                There Is No Experience To Show.
              </p>
            )} */}
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
              ? "bg-[#edfaff] pb-5  lg:-mt-3"
              : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover"
          } px-4 py-3 rounded-xl`}
        >
          <div className="flex justify-between items-center   ">
            <div>
              <p className="text-lg md:text-xl xl:text-2xl font-normal">
                Experience
              </p>
            </div>
          </div>
          <>
            {/* Display the first item */}
            {allExperience?.length > 0 && (
              <div
                key={allExperience[0]?._id}
                className="border-b space-y-1 py-5"
              >
                <div className="flex justify-between items-center">
                  <p className=" capitalize text-[17px] font-semibold">
                    {allExperience[0]?.role}
                  </p>
                </div>
                <p className=" capitalize text-[16px]">
                  {allExperience[0]?.companyName},{" "}
                  {allExperience[0]?.companyLocation}
                </p>
                {allExperience[0]?.endDate === "Currently Working" ? (
                  <p className=" capitalize text-[16px]">
                    {allExperience[0]?.endDate} as{" "}
                    {allExperience[0]?.employeeType}
                  </p>
                ) : (
                  <p className=" capitalize text-[16px]">
                    {allExperience[0]?.startDate}{" "}
                    {allExperience[0]?.endDate}
                  </p>
                )}
                {allExperience[0]?.endDate !== "Currently Working" && (
                  <p className=" capitalize text-[16px]">
                    Worked as {allExperience[0]?.employeeType}
                  </p>
                )}
              </div>
            )}

            {/* Display the rest of the items based on the showAll state */}
            {showAll &&
              allExperience?.slice(1).map((c) => (
                <div key={c?._id} className="py-5 space-y-1 border-b">
                  <div className="flex justify-between items-center">
                    <p className=" capitalize text-[17px] font-semibold">
                      {c?.role}
                    </p>
                  </div>
                  <p className=" capitalize text-[16px]">
                    {c?.companyName}, {c?.companyLocation}
                  </p>
                  {c?.endDate === "Currently Working" ? (
                    <p className=" capitalize text-[16px]">
                      {c?.endDate} as {c?.employeeType}
                    </p>
                  ) : (
                    <p className=" capitalize text-[16px]">
                      {"("} {c?.startDate}
                      {"-"} {c?.endDate} {")"}
                    </p>
                  )}

                  {c?.endDate !== "Currently Working" && (
                    <p className=" capitalize text-[16px]">
                      Worked as {c?.employeeType}
                    </p>
                  )}
                </div>
              ))}
            {allExperience?.length > 1 && (
              <div onClick={() => setShowAll(!showAll)}>
                {theme === "light" ? (
                  <div className=" flex items-center xl:space-x-1 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-1 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                    <p className="text-[13px] capitalize">
                      {showAll ? "Hide" : "Show all"} experiences
                    </p>
                    <FaArrowRight />
                  </div>
                ) : (
                  <div className="credintialBtn">
                    <p> {showAll ? "Hide" : "Show all"} experiences</p>
                  </div>
                )}
              </div>
            )}
            {/* Display message if there is no experience */}
            {/* {allExperience?.length === 0 && (
              <p className="py-7 text-[16px]">
                There Is No Experience To Show.
              </p>
            )} */}
          </>
        </div>
      </div>
    </>
  );
};

export default UserProfileExperienceVM;
