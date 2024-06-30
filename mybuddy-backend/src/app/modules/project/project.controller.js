import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { createProject,getProjectByUserService, getProjectsService } from "./project.service.js";


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

// ************** get all project
// export const getAllProjects = catchAsync(async (req, res, next) => {
//    const id= req.params._id; 
// const result = await getProjectsService(id);

// sendResponse(res, {
//   statusCode: httpStatus.OK,
//   success: true,
//   message: "Projects retrieved successfully!",
//   data: result,
// })
// })
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