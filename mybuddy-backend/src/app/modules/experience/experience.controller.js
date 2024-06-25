
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import httpStatus from "http-status";
import { createExperienceService, getSingleMemberExperienceService, updateExperienceService } from "./experience.service.js";

export const getSingleMemberExperienceController = catchAsync(async (req, res) => {
  const userId = req.params.id;
  //console.log(userId);
  const user = await getSingleMemberExperienceService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social Information retrieved successfully!",
    data: user,
  });
  
});


export const postSingleMemberExperienceController = catchAsync(async (req, res) => {
  const data = req.body;
  const newInfo = await createExperienceService(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Social Information created successfully!",
    data: newInfo,
  });
});

export const updateExperienceController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedInfo = await updateExperienceService(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social Information updated successfully!",
    data: updatedInfo,
  });
});
