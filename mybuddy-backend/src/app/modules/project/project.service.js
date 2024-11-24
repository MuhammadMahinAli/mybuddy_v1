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
// export const getAllProjectsService = async () => {
//   const projects = await Project.find({})
//     .populate("user", "name email profilePic" ,)
//     .populate("tasks")
//     .sort({ createdAt: -1 });
//   return projects;
// };


export const getProjectsService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;

    // Fetch projects and populate user details
    const projects = await Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', "name email profilePic country");
    const totalPage = await Project.countDocuments();

    return {
      projects,
      totalPages: Math.ceil(totalPage / limit),
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
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return updatedProject;
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
export const getAllProjectService = async (page, limit, uniqueId) => {
  const skip = (page - 1) * limit;

  // If uniqueId is provided, search for that specific project/member
  if (uniqueId) {
    const project = await Project.findOne({ uniqueId });
    if (!project) {
      return { message: "No project matched with the provided uniqueId." };
    }
    return { projects: [project], totalPages: 1, currentPage: page };
  } 

  // If no uniqueId, fetch paginated results
  const projects = await Project.find().skip(skip).limit(limit).populate('user');
  const totalMembers = await Project.countDocuments();

  return {
    projects,
    totalPages: Math.ceil(totalMembers / limit),
    currentPage: page,
  };
};

