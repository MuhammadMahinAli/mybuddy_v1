import { createLicenseService, updateLicenseService, getLicensesByUserService} from "./license.service.js";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import httpStatus from "http-status";

export const postCreateLicenseController = catchAsync(async (req, res) => {
  const data = req.body;
  const newLicense = await createLicenseService(data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "License created successfully!",
    data: newLicense,
  });
});

export const putUpdateLicenseController = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const updatedLicense = await updateLicenseService(userId, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "License updated successfully!",
    data: updatedLicense,
  });
});

export const getLicensesByUserController = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const licenses = await getLicensesByUserService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Licenses retrieved successfully!",
    data: licenses,
  });
});