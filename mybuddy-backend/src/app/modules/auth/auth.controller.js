import httpStatus from "http-status";
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import {loginUserService, refreshTokenService} from "./auth.service.js";
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
