
import {ApiError} from "../../../handleError/apiError.js";
import httpStatus from "http-status";
import { Experience } from "./experience.model.js";


//------------ get single member experience

export const getSingleMemberExperienceService = async (userId) => {
  try {
    const experience = await Experience.find({ user: userId }).populate('user');
    const sortedExperience = experience.sort((a, b) => b.createdAt - a.createdAt);
    return sortedExperience;
    
  } catch (error) {
    console.error("Error fetching user's experience:", error);
    throw new Error("Failed to fetch user's experience");
  }
};




//------------ post single member experience

export const createExperienceService = async (data) => {
  try {
    const result = await Experience.create(data);
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create member experience");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


//------------update single member experience

export const updateExperienceService = async (id, data) => {
  try {
    const isExist = await Experience.findOne({ _id: id});
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const updatedExperience = await Experience.findByIdAndUpdate(
      { _id: id },
      { $set: { ...data } },
      { new: true }
    );

    if (!updatedExperience) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Couldn't update experience");
    }

    return updatedExperience;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

