import  {SocialInformation} from './socialInformation.model.js';
import {ApiError} from "../../../handleError/apiError.js";
import httpStatus from "http-status";


//------------ get single me social information

export const getSingleMemberSocialInfoService = async (userId) => {
  try {
    const socials = await SocialInformation.find({ user: userId }).populate('user');
    return socials;
  } catch (error) {
    console.error("Error fetching user's socials:", error);
    throw new Error("Failed to fetch user's socials");
  }
};




//------------ post single me social information

export const createSocialInfoService = async (data) => {
  try {
    const result = await SocialInformation.create(data);
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create social information");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


//------------update single me social information

export const updateSocialInfoService = async (userId, data) => {
  try {
    const isExist = await SocialInformation.findOne({ user: userId });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const updatedSocial = await SocialInformation.findOneAndUpdate(
      { user: userId },
      { $set: { ...data } },
      { new: true }
    );

    if (!updatedSocial) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Couldn't update social info");
    }

    return updatedSocial;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
