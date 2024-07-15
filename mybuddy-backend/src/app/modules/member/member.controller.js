import {createMemberService,getAllMemberService,getSingleMember,resendEmailService,updateMemberCoverPicService,updateMemberInfoService,updateMemberProfilePicService,updateMemberService, verifyEmailService} from "./member.service.js";
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

// export const verifyEmail = catchAsync(async (req, res, next) => {
//   const { token } = req.query;
//   console.log('Token from request:', token);
//   const user = await Member.findOne({ verificationToken: token });
//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired verification token');
//   }

//   user.emailVerified = true;
//   user.verificationToken = undefined;
//   await user.save();

//   const userDetails = {
//     firstName: user.firstName,
//     lastName: user.lastName,
//     phoneNumber: user.phoneNumber,
//     email: user.email,
//     emailVerified: user.emailVerified,
//   };

//   res.status(httpStatus.OK).json({
//     success: true,
//     message: 'Email verified successfully!',
//     data: userDetails,
//   });
// });


// export const verifyEmail = catchAsync(async (req, res, next) => {
//  // Log received token

//   const token = req.params.token;

//   const user = await verifyEmailService(token);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Token holder retrieved successfully!",
//     data: user,
//   });
  
// });
export const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  //console.log('Received token:', token); // Log received token

  try {
    const userDetails = await verifyEmailService(token);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
      data: userDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errorMessages: [{ path: '', message: error.message }],
    });
  }
});

// -------------- resend email
export const resendVerificationEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await resendEmailService(email);
  res.status(200).json(result);
});


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