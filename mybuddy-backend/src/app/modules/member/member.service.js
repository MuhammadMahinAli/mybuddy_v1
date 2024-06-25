import httpStatus from "http-status";
import {ApiError} from "../../../handleError/apiError.js";
import {Member} from "./member.model.js";

// create user / signUp user
export const createMemberService = async (userInfo) => {
  const result = (await Member.create(userInfo)).toObject();
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  const {password, ...newUser} = result;
  return newUser;
};

///get all users
export const getAllMemberService = async () => {
  const users = await Member.find({})
  return users;
};

export const getSingleMember = async (id) => {
  const user = await Member.findOne({_id: id});
  return user;
};

//----------Update user
export const updateMemberService = async (id, updateData) => {
  const updatedMember = await Member.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedMember) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return updatedMember;
};

//------------- update profile pic

export const updateMemberProfilePicService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: { profilePic: data.profilePic } },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update profile pic");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//--------------- update cover pic
export const updateMemberCoverPicService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: { coverPic: data.coverPic } },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update cover pic");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//--------------- update user info
// export const updateMemberInfoService = async (userId, data) => {
//   try {
//     const member = await Member.findById(userId);
//     if (!member) {
//       throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
//     }
//     const updatedMember = await Member.findByIdAndUpdate(
//       userId,
//       { $set: { firstName: data.name.firstName } },
//       { $set: { lastName: data.name.lastName } },
//       { $set: { role: data.role } },
//       { $set: { about: data.about } },
//       { $set: { phoneNumber: data.phoneNumber } },
//       { $set: { address: data.address } },
//       { $set: { country: data.country } },
//       { new: true }
//     );

//     if (!updatedMember) {
//       throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update user information");
//     }

//     return updatedMember;
//   } catch (error) {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//   }
// };

export const updateMemberInfoService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }

    const updatedData = {
      name: {
        firstName: data.name.firstName,
        lastName: data.name.lastName,
      },
      role: data.role,
      about: data.about,
      phoneNumber: data.phoneNumber,
      phoneNumberPrivacy: data.phoneNumberPrivacy,
      address: data.address,
      addressPrivacy:data.addressPrivacy,
      country: data.country,
    };

    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update user information");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
