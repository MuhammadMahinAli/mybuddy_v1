import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Commit } from "./commit.model.js";
import { Project } from "../project/project.model.js";

//---- create commit
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
    .populate("commitBy", "name role profilePic")
    .populate("project")
    .sort({ createdAt: -1 });
  return commits;
};

// --------------- get commit by projectid
export const getCommitByProjectIdService = async (id) => {
  const commits = await Commit.find({ project: id })
    .populate("commitBy", "name role profilePic")
    .populate("project", "projectName")
    .sort({ createdAt: -1 });
  return commits;
};

// --------------- get commit by commitby
export const getMyAllCommitService = async (id, page, limit) => {
  try {
    const skip = (page - 1) * limit;

    // Fetch projects and populate user details
    const commits = await Commit.find({ commitBy: id })
      .skip(skip)
      .limit(limit)
      .populate("commitBy", "name role profilePic")
      .populate("project", "projectName")
      .sort({ createdAt: -1 });
    const totalPage = await Commit.countDocuments();

    return {
      commits,
      totalPages: Math.ceil(totalPage / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching commit:", error);
    throw new Error("Failed to retrieve commit");
  }
};

// services/commitService.js

export const updateCommitStatusService = async (
  id,
  status,
  declineMessage = null
) => {
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
