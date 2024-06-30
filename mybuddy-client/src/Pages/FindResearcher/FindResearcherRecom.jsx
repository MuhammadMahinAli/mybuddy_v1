const FindResearcherRecom = () => {
  const team = [
    {
      name: "Jhon Deol",
      role: "UI/UX Designer",
    },
    {
      name: "Jhon Deol",
      role: "UI/UX Designer",
    },
    {
      name: "Jhon Deol",
      role: "UI/UX Designer",
    },
    {
      name: "Jhon Deol",
      role: "UI/UX Designer",
    },
  ];
  const firstTableData = team.slice(0, 2);
  const secondTableData = team.slice(2, 6);
  const generateTableBody = (data, startIndex) => {
    return (
      <div className="space-y-3 lg:space-y-6">
        {data.map((trend, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-[280px] md:w-[500px] py-3 rounded-[20px] bg-[#c7ecf9] shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border h-20 md:h-[104px] border-[0.8px] border-solid border-gray"
          >
            <div className="text-sm xl:text-lg  font-semibold  border-r-2 border-gray-300 rounded-l-2xl md:pr-2 w-5 md:w-2/12">
              <div className="text-start md:text-center">
                #{startIndex + index + 1}
              </div>
            </div>

            <div className="text-sm xl:text-lg  font-semibold  border-r-2 border-gray-300 text-center w-28 lg:w-3/12">
              {trend?.name}
            </div>

            <div className="text-sm xl:text-lg  text-start rounded-r-2xl w-5/12 md:w-4/12">
              <p className="font-semibold text-center">{trend.role}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="md:py-5">
      <div className="flex flex-col xl:flex-row justify-between items-center space-y-3 xl:space-x-6">
        {generateTableBody(firstTableData, 0)}
        {generateTableBody(secondTableData, 2)}
      </div>
    </div>
  );
};

export default FindResearcherRecom;
