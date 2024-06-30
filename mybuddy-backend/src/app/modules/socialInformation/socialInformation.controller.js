import {createSocialInfoService, getSingleMemberSocialInfoService, updateSocialInfoService} from "./socialInformation.service.js";
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import httpStatus from "http-status";

export const getSingleMemberSocialInfoById = catchAsync(async (req, res) => {
  const userId = req.params.id;
  //console.log(userId);
  const user = await getSingleMemberSocialInfoService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social Information retrieved successfully!",
    data: user,
  });
  
});


export const postSingleMemberSocialInfo = catchAsync(async (req, res) => {
  const data = req.body;
  const newInfo = await createSocialInfoService(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Social Information created successfully!",
    data: newInfo,
  });
});

export const updateSocialInfoController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedInfo = await updateSocialInfoService(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Social Information updated successfully!",
    data: updatedInfo,
  });
});