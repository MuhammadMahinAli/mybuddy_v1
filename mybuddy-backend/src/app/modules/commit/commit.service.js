import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError";
import { Commit } from "./commit.model";

export const createCommit = async (commitData) => {
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
