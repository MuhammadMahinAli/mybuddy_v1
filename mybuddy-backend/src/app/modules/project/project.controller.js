import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { addTaskToProjectService, createProject,deleteProjectService,deleteTaskFromProjectService,getAllProjectService,getProjectByUserService, getProjectsService, getSingleProjectService, updateProjectService, updateProjectTasks, updateProjetRequestStatusService, updateTaskService, updateTaskStatusService } from "./project.service.js";


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

// export const getAllProjects = catchAsync(async (req, res) => {
//   const posts = await getProjectsService();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User's Project retrieved successfully!",
//     data: posts,
//   });
// });

export const getAllProjects = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const result = await getProjectsService(page, limit);

  if (result.message) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: result.message,
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects is retrieved successfully!",
    data: result,
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
//------------update project
export const updateTaskController = catchAsync(async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const updateData = req.body;
  const updatedProject = await updateTaskService(projectId, taskId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project's task updated successfully!",
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


//********** Update project status controller
export const updateProjetRequestStatusController = async (req, res) => {
  const { projectId } = req.params;
  const { isChecked } = req.body;

  console.log(projectId,isChecked);

  try {
    const updatedProject = await updateProjetRequestStatusService(projectId, isChecked);
    return res.status(200).json({
      success: true,
      message: 'Project request status updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// // Controller function to handle pagination and uniqueId filter
export const getAllProjectController = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const uniqueId = req.query.uniqueId || null;

  const result = await getAllProjectService(page, limit, uniqueId);

  if (result.message) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: result.message,
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully!",
    data: result,
  });
});





