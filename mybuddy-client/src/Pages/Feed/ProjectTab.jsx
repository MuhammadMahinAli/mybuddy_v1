import project from "../../assets/office-team-working-on-a-project-together 1.png";

const ProjectTab = ({ theme,user }) => {
  const projects = [
    {
      image: project,
      title: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description:
        "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Suscipit aliquid eligendi",
    },
    {
      image: project,
      title: "2 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description:
        "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Suscipit aliquid eligendi",
    },
    {
      image: project,
      title: "3 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description:
        "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Suscipit aliquid eligendi",
    },
  ];

  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const firstName = capitalize(user?.name?.firstName || "");
  const lastName = capitalize(user?.name?.lastName || "");

  const defaultProjectMissingMessage = `${firstName} ${lastName} has not added any project yet.`;
  return (
    <>
      <h1
        className={`${
          theme === "light" ? "graish" : "text-white"
        } text-[16px] xl:text-[23px] 3xl:text-[25px] font-semibold py-3 md:py-5 lg:pt-8`}
      >
        Projects
      </h1>
      <p
        className={` ${
          theme === "light" ? "text-gray-700" : "text-white"
        }  text-[16px] xl:text-[20px] pb-5 `}
      >
      {defaultProjectMissingMessage}
      </p>
      {/* <div
        data-aos="fade-down"
        data-aos-duration="1500"
        className="-pt-7 md:pt-0 lg:py-1 px-7 md:px-10 lg:px-10 xl:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-12 lg:gap-9 xl:gap-16"
      >
        {projects.map((p, i) => (
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
                src={p.image}
                className="h-[100px] md:h-[120px] xl:h-[160px]"
              />
            </div>
            <div className=" px-2 xl:p-3  md:px-5 lg:py-3 space-y-1 lg:space-y-1">
            
              <p className="font-semibold pb-2 text-[14px] lg:text-[15px] xl:text-xl">
                {p.title.slice(0, 18)}
              </p>
              <p
                className={`${
                  theme === "light" ? "text-gray-500" : "text-white"
                } pb-2 lg:pb-3 text-[14px] lg:text-[15px] xl:text-[15px] `}
              >
                {p.description.slice(0, 54)}
              </p>
              {theme === "light" ? (
                <button
                  className={`${
                    i === 0
                      ? "border-orange-400 text-orange-400"
                      : i === 1
                      ? "border-[#3c92c4] text-[#3c92c4]"
                      : "border-[#fa4f4f] text-[#fa4f4f]"
                  }
         py-1 md:py-2 px-3 w-full text-sm md:text-[16px] 3xl:text-xl font-medium rounded-[10px] border `}
                >
                  View more
                </button>
              ) : (
                <>
                  <button
                    className={`${
                      i === 0
                        ? "detailsRedBtn"
                        : i === 1
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
      </div> */}
    </>
  );
};

export default ProjectTab;

  {/* <div
           dangerouslySetInnerHTML={{
             __html: p?.description.slice(0, 200),
           }}
         /> */}
