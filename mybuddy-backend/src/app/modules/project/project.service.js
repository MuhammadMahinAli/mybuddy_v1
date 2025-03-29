import { Project } from "./project.model.js";
import { Member} from "../member/member.model.js"
import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Task } from "../task/task.model.js";

// ************** create project

// utils.js
export const generateUniqueId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
};

export const createProject = async (postData) => {
  try {
    postData.uniqueId = generateUniqueId();
    postData.isMemberRequestAccept = true;
    const result = await Project.create(postData);
    console.log(result);

    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create post"
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};



export const getProjectsService = async (page, limit) => {
  try { 
    const skip = (page - 1) * limit;

    // Fetch projects and populate user details
    const projects = await Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', "name email profilePic country");
    const totalProjects = await Project.countDocuments();
    const totalPages = Math.ceil(totalProjects / limit)

    return {
      projects,
      totalProjects,
      totalPages,
      currentPage: page,
    };
    
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to retrieve projects");
  }
};




export const getProjectByUserService = async (id) => {
  const projectByUser = await Project.find({ user: id })
    .populate("user")
    .populate("tasks")
    .sort({ createdAt: -1 });
  return projectByUser;
};

// *************** getspecific project
export const getSingleProjectService = async (id) => {
  const project = await Project.findOne({ _id: id })
    .populate("user")
    .populate("tasks");
  return project;
};

export const updateTaskStatusPositional = async (
  projectId,
  taskTitle,
  newStatus
) => {
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

//----------------- delete project

export const deleteProjectService = async (id) => {
  const result = await Project.findByIdAndDelete({ _id: id });
  return result;
};

//------------- delete task from project

export const deleteTaskFromProjectService = async (taskId) => {
  try {
    // Find the project containing the task
    const project = await Project.findOne({ "tasks._id": taskId });
    if (!project) {
      throw new Error("Project not found");
    }

    // Remove the task from the project's tasks array
    project.tasks = project.tasks.filter(
      (task) => task._id.toString() !== taskId
    );
    await project.save();

    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

//----------Update project
export const updateProjectService = async (id, updateData) => {
  const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedProject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  return updatedProject;
  
};
//----------Update task of a project
export const updateTaskService = async (projectId, taskId, updateData) => {
  console.log(projectId, taskId,updateData);
  const updateTask = await Project.findOneAndUpdate(
    { _id: projectId, "tasks._id": taskId },
    {
      $set: {
        "tasks.$": updateData, // Update the specific task with matching taskId
      },
    },
    { new: true } // Return the updated project document
  );

  if (!updateTask) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return updateTask;
};

//------------------ post task in projec

export const addTaskToProjectService = async (id, data) => {
  try {
    const project = await Project.findById(id);
    console.log("pp", id);
    if (!project) {
      throw new Error("Project not found");
    }

    project.tasks.push(data);
    await project.save();
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service for updating task status
export const updateTaskStatusService = async (projectId, taskId, status) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }

  const task = project.tasks.id(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }

  task.status = status;
  await project.save();
  return task;
};

//--------------- uodate project status & sub task status

export const updateProjectTasks = async (projectId, completedTask) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if (typeof completedTask !== "object") {
      throw new Error("completedTask is not an object");
    }

    const { task, subTask } = completedTask;

    project.tasks = project.tasks.map((projTask) => {
      if (projTask.title === task) {
        projTask.status = "completed";
      }

      if (Array.isArray(projTask.subTask)) {
        projTask.subTask = projTask.subTask.map((projSubTask) => {
          if (subTask.includes(projSubTask.todo)) {
            projSubTask.status = "completed";
          }
          return projSubTask;
        });
      }

      return projTask;
    });

    await project.save();
    console.log("Project tasks updated successfully");
  } catch (error) {
    console.error("Error updating project tasks:", error);
  }
};

// Update project 'isMemberRequestAccept' status
export const updateProjetRequestStatusService = async (projectId, isChecked) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    project.isMemberRequestAccept = isChecked;
    await project.save();

    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Modified service function to get members with pagination and uniqueId filter
// export const getAllProjectService = async (page, limit, uniqueId) => {
//   const skip = (page - 1) * limit;

//   // If uniqueId is provided, search for that specific project/member
//   if (uniqueId) {
//     const project = await Project.findOne({ uniqueId });
//     if (!project) {
//       return { message: "No project matched with the provided uniqueId." };
//     }
//     return { projects: [project], totalPages: 1, currentPage: page };
//   } 

//   // If no uniqueId, fetch paginated results
//   const projects = await Project.find().skip(skip).limit(limit).populate('user');
//   const totalMembers = await Project.countDocuments();

//   return {
//     projects,
//     totalPages: Math.ceil(totalMembers / limit),
//     currentPage: page,
//   };
// };

export const getAllProjectService = async (page, limit, uniqueId) => {
  const skip = (page - 1) * limit;

  // If uniqueId is provided, search for that specific project
  if (uniqueId) {
    const project = await Project.findOne({ uniqueId }).populate('user');
    if (!project) {
      return { message: "No project matched with the provided uniqueId." };
    }

    return {
      projects: [project],
      totalProjects: 1,
      currentPage: 1,
      totalPages: 1,
    };
  }

  // If no uniqueId, fetch paginated results
  const projects = await Project.find()
    .skip(skip)
    .limit(limit)
    .populate('user');

  const totalProjects = await Project.countDocuments();

  return {
    projects,
    totalProjects,
    currentPage: page,
    totalPages: Math.ceil(totalProjects / limit),
  };
};


// PROJECT FILTER BY CATEGORY
export const getAllProjectByCategoryService = async (filter, page = 1) => {
  const pageSize = 6; // 10 projects per page
  const skip = (page - 1) * pageSize;

  const query = {  ...filter };

  console.log(query);

  const projects = await Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize).populate('user', "name email profilePic country")
    .skip(skip)
    .limit(pageSize);

  const totalProjects = await Project.countDocuments(query);

  return {
    projects,
    totalProjects,
    totalPages: Math.ceil(totalProjects / pageSize),
    currentPage: page,
  };
};