// import { useContext } from "react";
// import { AuthContext } from "../../../Context/UserContext";
// import { Link } from "react-router-dom";
// import ProjectCard from "./ProjectCard";
// import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

// const Projects = () => {
//   const { getAllProjectByUser } = useContext(AuthContext);
//   const projects = getAllProjectByUser?.data;
//   console.log(projects);

//   return (
//     <div className="relative -mt-8 md:-mt-7 lg:mt-0 3xl:-mt-6 mr-4 md:mr-0 lg:mr-0 xl:mr-0">
//       <img
//         src="/more.svg"
//         className="h-20 absolute right-[10px] top-32 hidden"
//       />
//       <h1 className="gray600 text-[20px] lg:text-[28px] pb-5 font-bold">
//         PROJECTS
//       </h1>
//       {projects?.length > 0 ? (
//         <>
//         <div className="flex justify-between items-center lg:hidden">
//         <IoIosArrowBack className="text-3xl" />
//             <ProjectCard p={projects[0]} i={projects[0]?._id} />
//             <ProjectCard p={projects[1]} i={projects[1]?._id} />
//             <IoIosArrowForward className="text-3xl" />
//           </div>
//           {/* <div className="md:flex justify-between items-center hidden lg:hidden">
//             <ProjectCard p={projects[0]} i={projects[0]?._id} />
//             <ProjectCard p={projects[1]} i={projects[1]?._id} />
//           </div>
//           <div className="flex flex-col sm:flex-row md:hidden justify-between items-center  lg:flex">
//             <ProjectCard p={projects[0]} i={projects[0]?._id} />
//             <ProjectCard p={projects[1]} i={projects[1]?._id} />
//             <ProjectCard p={projects[2]} i={projects[2]?._id} />
//           </div> */}
//         </>
//       ) : (
//         <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not posted any project yet.`}</p>
//       )}
//       <div className="w-full flex justify-center items-center pt-3">
//         <Link to="/dashboard/all-projects">
//           <img src="/more2.svg" className="h-14 md:h-20  top-32" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Projects;

import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Projects = () => {
  const { getAllProjectByUser } = useContext(AuthContext);
  const projects = getAllProjectByUser?.data;
  console.log("prp", projects);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 2 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 2 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative -mt-8 md:-mt-7 lg:mt-0 3xl:-mt-6 mr-4 md:mr-0 lg:mr-0 xl:mr-0">
      <img
        src="/more.svg"
        className="h-20 absolute right-[10px] top-32 hidden"
      />
      <h1 className="gray600 text-[20px] lg:text-[28px] pb-5 font-bold">
        PROJECTS
      </h1>
      {projects?.length === 0 ? (
        <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not posted any project yet.`}</p>
      ) : (
        <>
          {/* Mobile and Tablet View */}
          <div className="flex justify-between items-center lg:hidden">
            {projects?.length === 1 ? (
              // When there is only 1 project
              <ProjectCard
                p={projects[0]}
                i={projects[0]?._id}
                className="w-full"
              />
            ) : projects?.length === 2 ? (
              // When there are 2 projects, show with slider arrows
              <>
                <IoIosArrowBack
                  className="text-3xl cursor-pointer"
                  onClick={handlePrev}
                />
                <ProjectCard
                  p={getAllProjectByUser?.data[currentIndex]}
                  i={getAllProjectByUser?.data[currentIndex]?._id}
                  className="w-[48%]"
                />
                <ProjectCard
                  p={getAllProjectByUser?.data[currentIndex + 1]}
                  i={getAllProjectByUser?.data[currentIndex + 1]?._id}
                  className="w-[48%]"
                />
                <IoIosArrowForward
                  className="text-3xl cursor-pointer"
                  onClick={handleNext}
                />
              </>
            ) : (
              // When there are more than 2 projects, show only 2 with slider
              <>
                <IoIosArrowBack
                  className="text-3xl cursor-pointer"
                  onClick={handlePrev}
                />
                <ProjectCard
                  p={getAllProjectByUser?.data[currentIndex]}
                  i={getAllProjectByUser?.data[currentIndex]?._id}
                  className="w-[48%]"
                />
                <ProjectCard
                  p={getAllProjectByUser?.data[currentIndex + 1]}
                  i={getAllProjectByUser?.data[currentIndex + 1]?._id}
                  className="w-[48%]"
                />
                <IoIosArrowForward
                  className="text-3xl cursor-pointer"
                  onClick={handleNext}
                />
              </>
            )}
          </div>

          {/* Large Screen View */}
          <div className="lg:flex justify-between items-center hidden">
            {getAllProjectByUser?.data?.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project._id}
                p={project}
                i={project._id}
                className="w-[32%]"
              />
            ))}
          </div>
        </>

        // <>
        //   <div className="flex justify-between items-center lg:hidden">
        //     <IoIosArrowBack className="text-3xl" onClick={handlePrev} />
        //     <ProjectCard p={projects[currentIndex]} i={projects[currentIndex]?._id} />
        //     <ProjectCard p={projects[currentIndex + 1]} i={projects[currentIndex + 1]?._id} />
        //     <IoIosArrowForward className="text-3xl" onClick={handleNext} />
        //   </div>

        //   <div className="lg:flex justify-between items-center hidden">
        //   <ProjectCard p={projects[currentIndex]} i={projects[currentIndex]?._id} />
        //   <ProjectCard p={projects[currentIndex]} i={projects[currentIndex]?._id} />
        //   <ProjectCard p={projects[currentIndex]} i={projects[currentIndex]?._id} />
        //   </div>
        // </>
      )}
      {projects?.length === 3 && (
        <div className="w-full flex justify-center items-center pt-3">
          <Link to="/dashboard/all-projects">
            <img src="/more2.svg" className="h-14 md:h-20 top-32" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Projects;
