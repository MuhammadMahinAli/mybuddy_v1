import whiteBorder from "../../../assets/home/p-border.png";
import darkBorder from "../../../assets/home/dark-border.png";
const TeamMember = ({ teamMembers,theme }) => {
  const bgColors = [
    "#fff3c4",
    "#e0ebf6",
    "#d0cddd",
    "#d0eafd",
    "#d0cddd",
    "#e0ffd2",
    "#fddac2",
    "#b0d3e8",
  ];
  // md:w-[500px] lg:w-[390px] xl:w-[500px]
  return (
    <div className="bg-[#f5f5f5] flex justify-center items-center w-full  h-[170px] sm:h-[150px] md:h-[250px] xl:h-[280px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-8 xl:gap-14 pt-3  max-h-[140px] md:max-h-[250px] md:gap-x-6  overflow-y-auto ml-5 lg:ml-0 hide-scrollbar">
        {teamMembers?.map((item, index) => (
          <>
            <div className="flex items-center space-x-3">
                        <div className="flex flex-col justify-center items-center relative">
                          <img
                            src={
                              item?.member?.profilePic
                                ?item?.member?.profilePic
                                : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                            }
                            className={`h-[40px] w-[40px] lg:h-[50px] lg:w-[50px] rounded-full p-[5px] `}
                          />
                          <img
                            className="w-16 lg:w-32 xl:w-36 absolute"
                            src={theme === "light" ? darkBorder : whiteBorder}
                            loading="lazy"
                            alt="dashedborder"
                          />
                        </div>
                        <div>
                          <p
                            className={`${
                              theme === "light" ? "text-gray-500" : "text-white"
                            } text-sm xl:text-lg font-medium capitalize pt-b `}
                          >
                            {item?.member?.name?.firstName} {item?.member?.name?.lastName}
                          </p>
                          <p
                            className={`${
                              theme === "light" ? "text-gray-500" : "text-white"
                            } text-lg font-medium capitalize pt-b `}
                          >
                            {item?.member?.role}
                          </p>
                        </div>
                      </div>
          {/* <div
            key={item?.member?.profilePic}
            style={{ backgroundColor: bgColors[index] }}
            className="flex  items-center px-3 py-2 rounded-lg shadow-lg  "
          >
            <img
              src={
                item?.member?.profilePic
                  ? item?.member?.profilePic
                  : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
              }
              loading="lazy"
              alt={item?.member?.name?.firstName}
              className="h-9 w-9 rounded-lg ml-2"
            />
            <div className="text-sm md:text-[14px] py-1 px-3 rounded-md font-semibold capitalize">
              {item?.member?.name?.firstName} {item?.member?.name?.lastName}
            </div>
          </div> */}
          </>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
