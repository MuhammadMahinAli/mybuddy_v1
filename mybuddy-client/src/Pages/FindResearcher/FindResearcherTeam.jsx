

const FindResearcherTeam = () => {
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
          <div className=" space-y-6">
            {data.map((trend, index) => (
              <div
                key={index}
                className="flex  justify-center items-center w-[280px] md:w-[500px] py-3 rounded-[20px] bg-[#c7ecf9] shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border h-[104px] border-[0.8px] border-solid border-gray"
              >
                <div className="text-[14px] xl:text-lg  text-center font-semibold  border-r-2 border-gray-300 rounded-l-2xl pr-7 xl:pr-2 w-7 md:w-2/12">
                  <div className="">#{startIndex + index + 1}</div>
                </div>
    
                <div className=" flex flex-col justify-center items-center border-r-2 border-gray-300 p-2 w-4/12 md:w-2/12 xl:w-3/12">
                  <div
                    className={`rounded-lg overflow-hidden`}
                    style={{
                      backgroundColor: trend?.bgColor || "#ffffff",
                    }}
                  >
                    <img
                      className="h-8 w-10 xl:h-14 xl:w-16 object-center"
                      src="https://source.unsplash.com/150x150/?portrait?3"
                      loading="lazy" alt={trend.title}
                    />
                    
                  </div>
                  <p className="text-[14px] xl:text-lg font-semibold text-center md:hidden">{trend?.name}</p>
                </div>
    
                <div className="hidden md:block text-[14px] xl:text-lg  font-semibold  border-r-2 border-gray-300 text-center w-3/12">
                  {trend?.name}
                </div>
    
                <div className="text-[14px] xl:text-lg  text-start rounded-r-2xl w-4/12 xl:w-3/12">
                  <p className="font-semibold text-center">{trend.role}</p>
                </div>
              </div>
            ))}
          </div>
        );
      };
    return (
        <div className="py-5">
             <div className="flex flex-col xl:flex-row justify-between items-center space-y-3 xl:space-x-6">
          {generateTableBody(firstTableData, 0)}
          {generateTableBody(secondTableData, 2)}
        </div>
        </div>
    );
};

export default FindResearcherTeam;