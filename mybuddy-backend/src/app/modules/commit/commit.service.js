import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Commit } from "./commit.model.js";

export const createCommitService = async (commitData) => {
  try {
    const result = Commit.create(commitData);
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to commit.");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//--------get all commit

export const getAllCommitService = async () => {
  const commits = await Commit.find({})
    .populate("commitBy")
    .populate("project")
    .sort({ createdAt: -1 });
  return commits;
};

//--------------------- update status
// export const updateCommitStatusService = async (id, status) => {
//   const updatedCommitStatus = await Commit.findById({_id:id});
//   if (!updatedCommitStatus) {
//      throw new ApiError(httpStatus.NOT_FOUND, "Project join request not found");
//   }
//   updatedCommitStatus.status = status;
//   await updatedCommitStatus.save();
//   return updatedCommitStatus;
//  };

// services/commitService.js

export const updateCommitStatusService = async (id, status, declineMessage = null) => {
  const updatedCommitStatus = await Commit.findById({ _id: id });
  
  if (!updatedCommitStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, "Commit not found");
  }
  
  updatedCommitStatus.status = status;
  
  if (status === "Declined") {
    updatedCommitStatus.declineMessage = declineMessage;
  }
  
  await updatedCommitStatus.save();
  
  return updatedCommitStatus;
};
