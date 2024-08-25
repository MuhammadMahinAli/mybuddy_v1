import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { createCommitService, getAllCommitService, updateCommitStatusService } from "./commit.service.js";

export const createCommitController = catchAsync(async (req, res, next) => {
    const data = req.body;
   
    const projectJoinRequest = await createCommitService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project request created successfully!",
      data: projectJoinRequest ,
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

  // -------------------- update status
// export const updateCommitStatusController = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;
//     const updatedCommitStatus = await updateCommitStatusService(id, status);
//     sendResponse(res, {
//        statusCode: httpStatus.OK,
//        success: true,
//        message: "Commit status updated successfully",
//        data: updatedCommitStatus,
//     });
//    });

// controllers/commitController.js

export const updateCommitStatusController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status, declineMessage } = req.body;
    const updatedCommitStatus = await updateCommitStatusService(id, status, declineMessage);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Commit status updated successfully",
      data: updatedCommitStatus,
    });
  });
  