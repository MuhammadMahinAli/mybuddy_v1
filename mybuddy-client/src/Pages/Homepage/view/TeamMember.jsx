const TeamMember = ({ teamMembers, openComponen }) => {
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
  return (
    <div className="flex justify-center items-center md:w-[500px] lg:w-[390px] xl:w-[500px] h-[140px] sm:h-[130px] md:h-[250px] xl:h-[280px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-8 pt-3  max-h-[140px] md:max-h-[250px] md:gap-x-6 xl:gap-6 overflow-y-auto ml-5 lg:ml-0 hide-scrollbar">
        {teamMembers?.map((item, index) => (
          <div
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
              alt={item?.member?.name?.firstName}
              className="h-9 w-9 rounded-lg ml-2"
            />
            <div className="text-sm md:text-[14px] py-1 px-3 rounded-md font-semibold capitalize">
              {item?.member?.name?.firstName}  {item?.member?.name?.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
