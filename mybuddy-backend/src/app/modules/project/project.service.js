import { Project } from "./project.model.js";
import httpStatus from "http-status";

// ************** create project

export const createProject = async(postData) => {
   try {
      const result = await Project.create(postData);
     
      if (!result) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
      }
      return result;
   } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
   }
  };
// ************** get projects  01815000012
export const getProjectsService = async (project) => {
   const projects = await Project.find({project}).populate("user").sort({ createdAt: -1 });
   return projects;
}

export const getProjectByUserService = async (id) => {
   const projectByUser = await Project.find({user: id}).populate("user").sort({ createdAt: -1 });
   return projectByUser;
 };