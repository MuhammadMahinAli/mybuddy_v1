import { Project } from "./project.model.js";
import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Task } from "../task/task.model.js";

// ************** create project

export const createProject = async (postData) => {
  try {
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
export const getProjectsService = async (project) => {
  const projects = await Project.find({ project })
    .populate("user")
    .populate("tasks")
    .sort({ createdAt: -1 });
  return projects;
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
    if (!Array.isArray(completedTask)) {
      throw new Error("completedTasks is not an array");
    }
    if (!Array.isArray(project.tasks)) {
      throw new Error("Tasks array is missing or not an array");
    }

    const completedTaskTitles = completedTask?.map((task) => task.taskTitle);

    project.tasks = project.tasks.map((task) => {
      if (completedTaskTitles.includes(task.title)) {
        task.status = "completed";
      }

      if (Array.isArray(task.subTask)) {
        task.subTask = task.subTask.map((subtask) => {
          if (completedTaskTitles.includes(subtask.todo)) {
            subtask.status = "completed";
          }
          return subtask;
        });
      }

      return task;
    });

    await project.save();
    console.log("Project tasks updated successfully");
  } catch (error) {
    console.error("Error updating project tasks:", error);
  }
};
