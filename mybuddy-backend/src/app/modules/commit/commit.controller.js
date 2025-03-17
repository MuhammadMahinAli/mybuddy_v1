import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import {
  createCommitService,
  getAllCommitService,
  getCommitByProjectIdService,
  getMyAllCommitService,
  updateCommitStatusService,
} from "./commit.service.js";

export const createCommitController = catchAsync(async (req, res, next) => {
  const data = req.body;

  const projectJoinRequest = await createCommitService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project request created successfully!",
    data: projectJoinRequest,
  });
});

//-------get all commit
export const getAllCommitController = catchAsync(async (req, res) => {
  const commits = await getAllCommitService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Commit retrieved successfully!",
    data: commits,
  });
});

// -------------------- get commit by project id

export const getCommitByProjectController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const commits = await getCommitByProjectIdService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Commit by project is retrieved successfully!",
    data: commits,
  });
});

// -------------------- get commit by commitBy
export const getMyAllCommitController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const result = await getMyAllCommitService(id, page, limit);

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
    message: "My all commit  is retrieved successfully!",
    data: result,
  });
});

//--------- update commit status controller

export const updateCommitStatusController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, declineMessage } = req.body;
  const updatedCommitStatus = await updateCommitStatusService(
    id,
    status,
    declineMessage
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Commit status updated successfully",
    data: updatedCommitStatus,
  });
});
