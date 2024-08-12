import { Project } from "./project.model.js";
import httpStatus from "http-status";import { ApiError } from "../../../handleError/apiError.js"
import { Task } from "../task/task.model.js";

// ************** create project

export const createProject = async(postData) => {
   try {
      const result = await Project.create(postData);
      console.log(result);
     
      if (!result) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
      }
      return result;
   } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
   }
  };

// export const createProject = async (data) => {
//   try {
//     // Create task documents and collect their IDs
//     const taskIds = [];
//     for (const task of data.tasks) {
//       const newTask = new Task(task);
//       await newTask.save();
//       taskIds.push(newTask._id);
//     }

//     // Create project with task IDs
//     const projectData = {
//       ...data,
//       tasks: taskIds,
//     };
//     const project = new Project(projectData);
//     const result = await project.save();

//     if (!result) {
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create project");
//     }
//     return result;
//   } catch (error) {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//   }
// };
// ************** get projects  01815000012
export const getProjectsService = async (project) => {
   const projects = await Project.find({project}).populate("user").populate("tasks").sort({ createdAt: -1 });
   return projects;
}

export const getProjectByUserService = async (id) => {
   const projectByUser = await Project.find({user: id}).populate("user").populate("tasks").sort({ createdAt: -1 });
   return projectByUser;
 };

 // *************** getspecific project
 export const getSingleProjectService = async (id) => {
   const project = await Project.findOne({_id: id}).populate("user").populate("tasks");
   return project;
 };

 export const updateTaskStatusPositional = async (projectId, taskTitle, newStatus) => {
   try {
     const project = await Project.findOneAndUpdate(
       { _id: projectId, "tasks.title": taskTitle },
       { $set: { "tasks.$.status": newStatus } },
       { new: true }
     );
 
     if (!project) {
       throw new ApiError(httpStatus.NOT_FOUND, "Project or task not found.");
     }
 
     return project;
   } catch (error) {
     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
   }
 };

 //------------------ post task in project

// export const addTaskToProjectService = async (projectId, taskData) => {
//   const project = await Project.findById(projectId);
//   if (!project) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
//   }
//   project.tasks.push(taskData);
//   await project.save();
//   return project;
// };

export const addTaskToProjectService = async (projectId, task) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
console.log(project);
    // Add the new task to the project's tasks array
    project.tasks.push(task);
    await project.save();

    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};


//  export const updateTaskStatus = async(projectId, data)=>{
//    try{
// const project = await Project.findById(projectId);
// if(!project){
//    throw new ApiError(httpStatus.NOT_FOUND, "Project is not found.") 
// }
// const updatedStatus = await Project.findByIdAndUpdate(
//    projectId,
//    {$set:{tasks.status : data.updatedStatus}},
//    {new:true}
// );
// if(!updatedStatus){
//    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update task status");

// }
// return updatedStatus;
//    }
//    catch(error){
// throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//    }
 //}