import {createMemberService,getAllMemberService,getSingleMember,updateMemberCoverPicService,updateMemberInfoService,updateMemberProfilePicService,updateMemberService} from "./member.service.js";
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import httpStatus from "http-status";
import { Member } from "./member.model.js";
import { ApiError } from "../../../handleError/apiError.js";

//------create an user
export const createMember= catchAsync(async (req, res, next) => {
  const data = req.body;
  const newMember = await createMemberService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: newMember,
  });
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  const user = await Member.findOne({ verificationToken: token });

  // Moved the initial response outside of the conditional block
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired verification token');
  }



  user.emailVerified = true;
  //user.verificationToken = undefined;
  await user.save();

  const userDetails = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    emailVerified: user.emailVerified,
    // Include any other user fields you want to send in the response
  };

  // Send the final response after all operations are completed
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email verified successfully!',
    data:userDetails
  });
});

// export const verifyEmail = catchAsync(async (req, res, next) => {
//   const { token } = req.query;

//   const user = await Member.findOne({ verificationToken: token });

//   if (!user) {
//          throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired verification token');
//        }

//   // Update the user document to reflect email verification
//   user.emailVerified = true;
//   user.verificationToken = undefined;
//   await user.save();

//   // Prepare the user data to send in the response
//   const userDetails = {
//     firstName: user.firstName,
//     lastName: user.lastName,
//     email: user.email,
//     emailVerified: user.emailVerified,
//     // Include any other user fields you want to send in the response
//   };

//   // Send a response indicating the email has been verified successfully, along with the user details
//   return res.status(httpStatus.OK).json({
//     success: true,
//     message: 'Email verified successfully!',
//     userDetails: userDetails, // Include user details in the response
//   });

//-------get all users
export const getAllMembers = catchAsync(async (req, res) => {
  const members = await getAllMemberService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully!",
    data: members,
  });
});

//------get single user
export const getSingleMemberById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const user = await getSingleMember(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully!",
    data: user,
  });
});


//------------update member
export const updateMemberById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const updatedUser = await updateMemberService(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: updatedUser,
  });
});

//------------- update cover pic

export const updateMemberCoverPicController = catchAsync(async (req, res) => {
  const data = req.body;
  const updatedMember = await updateMemberCoverPicService(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cover picture updated successfully!",
    data: updatedMember,
  });
});


// ------------- update profile pic 

export const updateMemberProfilePicController = catchAsync(async (req, res) => {
  const data = req.body;
  const updatedMember = await updateMemberProfilePicService(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile picture updated successfully!",
    data: updatedMember,
  });
});
// ------------- update member info

export const updateMemberInfoController = catchAsync(async (req, res) => {
  const data = req.body;
  const updatedMember = await updateMemberInfoService(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User information updated successfully!",
    data: updatedMember,
  });
});

//////////////////


// export const getExcludedFriends = async (req, res) => {
//   try {
//     const { memberId } = req.params;
//     const excludedMembers = await getExcludedFriendsService(memberId);
//     res.status(200).json(excludedMembers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };