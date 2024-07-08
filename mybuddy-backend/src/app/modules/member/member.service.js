import httpStatus from "http-status";
import {ApiError} from "../../../handleError/apiError.js";
import {Member} from "./member.model.js";
import crypto from 'crypto';
import { sendEmail } from "../../../utils/emaillService.js";

// create user / signUp user
// export const createMemberService = async (userInfo) => {
//   const result = (await Member.create(userInfo)).toObject();
//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
//   }
//   const {password, ...newUser} = result;
//   return newUser;
// };
export const createMemberService = async (userInfo) => {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  userInfo.verificationToken = verificationToken;

  const result = (await Member.create(userInfo)).toObject();
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  const { password, ...newUser } = result;
  console.log(result);

  const verificationUrl = `http://localhost:5173/verify-email?token=${verificationToken}`;

  // Send verification email
  // await sendEmail({
  //   to: newUser.email,
  //   subject: 'Verify your email',
  //   html: `<p>Please verify your email by clicking the link below:</p><a href="${verificationUrl}">Verify Email</a>`,
  // });

  await sendEmail({
    to: newUser.email,
    subject: 'Verify Your Email Address',
    html: `
      <p className='capitalize font-bold'>Dear ${newUser.name.firstName} ${newUser.name.lastName},</p>
      <p>Thank you for signing up with us! We're excited to have you on board. To ensure the security and activation of your account, please verify your email address.</p>
      <p>To get started, click the link below:</p>
      <p><a className='font-semibold' href="${verificationUrl}">Verify Your Email</a></p>
      <p>If you did not sign up for this account, please ignore this email.</p>
      <p className='font-bold'>Best regards,</p>
      <p className='font-bold'>The Research Buddy Team</p>
    `,
  });

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

