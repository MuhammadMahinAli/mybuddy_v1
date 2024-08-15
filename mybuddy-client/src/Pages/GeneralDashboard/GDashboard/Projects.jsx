import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const Projects = () => {
  const { getAllProjectByUser } = useContext(AuthContext);
  const projects = getAllProjectByUser?.data;
  console.log(projects);

  return (
    <div className="relative -mt-8 md:-mt-7 lg:mt-0 3xl:-mt-6 mr-4 md:mr-0 lg:mr-0 xl:mr-0">
      <img
        src="/more.svg"
        className="h-20 absolute right-[10px] top-32 hidden"
      />
      <h1 className="gray600 text-[20px] lg:text-[28px] pb-5 font-bold">
        PROJECTS
      </h1>
      {projects?.length > 0 ? (
        <>
        <div className="flex justify-between items-center lg:hidden">
        <IoIosArrowBack className="text-3xl" />
            <ProjectCard p={projects[0]} i={projects[0]?._id} />
            <ProjectCard p={projects[1]} i={projects[1]?._id} />
            <IoIosArrowForward className="text-3xl" />
          </div>
          {/* <div className="md:flex justify-between items-center hidden lg:hidden">
            <ProjectCard p={projects[0]} i={projects[0]?._id} />
            <ProjectCard p={projects[1]} i={projects[1]?._id} />
          </div>
          <div className="flex flex-col sm:flex-row md:hidden justify-between items-center  lg:flex">
            <ProjectCard p={projects[0]} i={projects[0]?._id} />
            <ProjectCard p={projects[1]} i={projects[1]?._id} />
            <ProjectCard p={projects[2]} i={projects[2]?._id} />
          </div> */}
        </>
      ) : (
        <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not posted any project yet.`}</p>
      )}
      <div className="w-full flex justify-center items-center pt-3">
        <Link to="/dashboard/all-projects">
          <img src="/more2.svg" className="h-14 md:h-20  top-32" />
        </Link>
      </div>
    </div>
  );
};

export default Projects;
