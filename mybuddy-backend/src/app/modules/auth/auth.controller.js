import httpStatus from "http-status";
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import {loginUserService, refreshTokenService, updatePasswordService} from "./auth.service.js";
import config from "../../../config/index.js";
//
export const loginUser = catchAsync(async (req, res) => {
  const data = req?.body;
  const result = await loginUserService(data);
  const {refreshToken, ...others} = result;
  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: others,
  });
});
//create refreshToken
export const refreshToken = catchAsync(async (req, res) => {
  //

  const {refreshToken} = req.cookies;
  const result = await refreshTokenService(refreshToken);
  //set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token generated successfully!",
    data: result,
  });
});

//----------- update pass

export const updatePassword = catchAsync(async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "User ID and new password are required",
    });
  }

  // Call the service that updates the password and generates new tokens
  const result = await updatePasswordService(userId, newPassword);

  // Send response back with the new tokens
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result.message,
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
  });
});
