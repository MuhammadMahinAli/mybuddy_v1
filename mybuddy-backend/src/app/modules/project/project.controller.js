import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { addTaskToProjectService, createProject,deleteProjectService,deleteTaskFromProjectService,getProjectByUserService, getProjectsService, getSingleProjectService, updateProjectService, updateProjectTasks, updateTaskStatusService } from "./project.service.js";


// ************** create project

export const createNewProject= catchAsync(async (req, res, next) => {
  const data = req.body;
  const newProject = await createProject(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project created successfully!",
    data: newProject,
  });
});
// ************** insert task in project

export const addTaskToProjectController = catchAsync(async(req,res)=>{
  const id = req.params.id;
  const data = req.body;
  const newTask = await addTaskToProjectService(id,data);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"New task created successfully !!",
    data:newTask
  })
})
//----------------- delete task from project
export const deleteTaskFromProjectController = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const updatedProject = await deleteTaskFromProjectService(taskId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task deleted successfully",
    data: updatedProject,
  });
});




// ************** get all project

export const getAllProjects = catchAsync(async (req, res) => {
  const posts = await getProjectsService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's Project retrieved successfully!",
    data: posts,
  });
});

export const getAllProjectByUserController = catchAsync(async (req, res) => {
  const collections = await getProjectByUserService(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "collections retrieved successfully!",
    data: collections,
  });
});

// -------- get single project

export const getSingleProjectController = catchAsync(async(req,res)=>{
  const id = req.params.id;
  const project = await getSingleProjectService(id);

  sendResponse(res, {
    statusCode:httpStatus.OK,
    success:true,
    message:"Project's details retrived successfully",
    data: project
  })
})

export const updateTaskStatus = catchAsync(async(req,res)=>{
  const id=req.params.id;
  const updateStatus = await updateTaskStatusController(id);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Task status updated successfully !!!",
    data:updateStatus
  })
})

//----------------- delete project


export const deleteProjectController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const project = await deleteProjectService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully!",
    data: project,
  });
});

//------------update project
export const updateProjectController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const updatedProject = await updateProjectService(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully!",
    data: updatedProject,
  });
});


// Controller for updating task status
export const updateTaskStatusController = catchAsync(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { status } = req.body;

  const updatedTask = await updateTaskStatusService(projectId, taskId, status);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task status updated successfully",
    data: updatedTask,
  });
});

// Controller for updating subtask status



export const updateProjectTasksController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { completedTask } = req.body;

    await updateProjectTasks(projectId, completedTask);

    res.status(httpStatus.OK).json({ message: "Project tasks updated successfully" });
  } catch (error) {
    next(error);
  }
};







