// import { useContext } from "react";
// import { AuthContext } from "../../../Context/UserContext";

const Projects = () => {

  //const{getAllProjectByUser} = useContext(AuthContext);
  //const projects = getAllProjectByUser?.data;
  //console.log(projects);

  return (
    <div className="relative -mt-8 md:-mt-7 lg:mt-0 3xl:-mt-6 mr-4 md:mr-0 lg:mr-5 xl:mr-0">
      <img
        src="/more.svg"
        className="h-20 absolute right-[10px] top-32 hidden"
      />
      <h1 className="gray600 text-[20px] lg:text-[28px] pb-5 font-bold">
        PROJECTS
      </h1>
      <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not posted any project yet.`}</p>
      {/* <div className="flex flex-col md:flex-row space-y-5 md:space-y-0  md:space-x-7 lg:space-x-4 xl:space-x-7 3xl:space-x-14 md:items-center">
        {projects?.length > 0 ? (
          projects?.slice(0, 3).map((p, i) => (
            <>
              <div
                key={i}
                className={`${
                  i === projects?.length - 1 && "hidden md:block"
                } p-5 space-y-1 flex flex-col justify-start rounded-[25px] bg-skyblue shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] overflow-hidden`}
              >
                <div className="flex justify-center items-center rounded-2xl h-14 w-16 md:h-16 md:w-16 bg-white">
                  <img
                    src={p.images[0]}
                    className="h-12 w-12 md:h-11 rounded-lg"
                  />
                </div>
                <p className="text-xl font-semibold py-3">
                  {p.projectName.slice(0, 10)}...
                </p>
                <button className="py-1 w-full font-medium rounded-[10px] bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                  Details
                </button>
              </div>
              <div className="w-full flex justify-center items-center pt-3">
                <Link to="/dashboard/all-projects">
                  <img src="/more2.svg" className="h-20  top-32" />
                </Link>
              </div>
            </>
          ))
        ) : (
          <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not posted any project yet.`}</p>
        )}
      </div> */}
    </div>
  );
};

export default Projects;
