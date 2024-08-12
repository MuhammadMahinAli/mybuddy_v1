import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";

const Projects = () => {
  const { getAllProjectByUser } = useContext(AuthContext);
  const projects = getAllProjectByUser?.data;
  console.log(projects);

  return (
    <div className="relative -mt-8 md:-mt-7 lg:mt-0 3xl:-mt-6 mr-4 md:mr-0 lg:mr-5 xl:mr-0">
      <img
        src="/more.svg"
        className="h-20 absolute right-[10px] top-32 hidden"
      />
      <h1 className="gray600 text-[20px] lg:text-[28px] pb-5 font-bold">
        PROJECTS
      </h1>
      {/* <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not posted any project yet.`}</p> */}
      <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0  md:space-x-7 lg:space-x-4 xl:space-x-7 3xl:space-x-14 md:items-center">
        {projects?.length > 0 ? (
          projects?.slice(0, 3).map((p, i) => (
            <>
              <div key={i}>
                <div
                  className={`pb-3 m-2 space-y-1 flex flex-col justify-start rounded-xl md:rounded-[25px] bg-skyblue  shadow-xl overflow-hidden`}
                >
                  <div className="flex justify-center items-center h-[150px] ssm:h-[190px] md:h-[140px] xl:h-[180px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                    <img
                      src={p.images[0]}
                      className="rounded-2xl h-[150px] ssm:h-[190px] md:h-[140px] xl:h-[180px] w-full object-cover"
                    />
                  </div>

                  <div className="px-2 xs-2 ssm:pt-1 lg:pt-12 3xl:pt-6 xl:p-3  md:px-5 lg:py-3 space-y-1 lg:space-y-1">
                    <p className="2xl:hidden text-xl 3xl:text-[22px] graish font-bold py-2 xs:py-3">
                      {p?.projectName.length > 15
                        ? `${p.projectName.slice(0, 7)}...`
                        : p.projectName}
                    </p>
                    <p className="hidden 2xl:block text-xl 3xl:text-[22px] graish font-bold py-3">
                      {p.projectName}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: p?.description.slice(0, 100),
                      }}
                    />
                    <p className="pb-2 text-[14px] lg:text-[15px] xl:text-xl graish">
                      {p.des}
                    </p>
                    <button
                      className={`${i}

               w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not posted any project yet.`}</p>
        )}
      </div>
      <div className="w-full flex justify-center items-center pt-3">
        <Link to="/dashboard/all-projects">
          <img src="/more2.svg" className="h-14 md:h-20  top-32" />
        </Link>
      </div>
    </div>
  );
};

export default Projects;
