import {
  createMemberService,
  getAllMemberByFilterService,
  getAllMemberService,
  getSingleMember,
  resendEmailService,
  resetPasswordService,
  sendForgetPasswordEmailService,
  updateMemberCoverPicService,
  updateMemberInfoService,
  updateMemberProfilePicService,
  updateMemberService,
  verifyEmailService,
} from "./member.service.js";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import httpStatus from "http-status";
import { Member } from "./member.model.js";
import { ApiError } from "../../../handleError/apiError.js";

//------create an user
export const createMember = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log("memberdata", data);
  const newMember = await createMemberService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: newMember,
  });
});

// //------------ get all user
export const getAllUserController = catchAsync (async ()=>{

  const members = await getAllUserService();

  sendResponse({
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully!",
    data: members,
  });
})

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
      message: "Email verified successfully!",
      data: userDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errorMessages: [{ path: "", message: error.message }],
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
// export const getAllMembers = catchAsync(async (req, res) => {
//   const members = await getAllMemberService();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Members retrieved successfully!",
//     data: members,
//   });
// });

// export const getAllMembers = catchAsync(async (req, res) => {
//   const { id, role, page } = req.query; // Extract query parameters

//   const filter = {};
//   if (id) {
//     filter._id = id; // Search by ID
//   }
//   if (role) {
//     filter.role = role; // Search by role
//   }

//   const result = await getAllMemberService(filter, Number(page) || 1);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Members retrieved successfully!",
//     data: result.members,
//   meta: {
//       totalMembers: result.totalMembers,
//       totalPages: result.totalPages,
//       currentPage: result.currentPage,
//     },
//   });
// });
// export const getAllMembers = catchAsync(async (req, res) => {
//   const { id, role, page } = req.query; // Extract query parameters

//   const filter = {};
//   if (id) {
//     filter._id = id; // Search by ID
//   }
//   if (role) {
//     filter.role = role; // Search by role
//   }

//   // Call the service to get members and pagination info
//   const result = await getAllMemberService(filter, Number(page) || 1);

//   // Check if the result has pagination information
//   const paginationMeta = (result.totalMembers !== undefined && result.totalPages !== undefined) ? {
//     totalMembers: result.totalMembers,
//     totalPages: result.totalPages,
//     currentPage: result.currentPage,
//     pageSize: 10,
//   } : null;
  

//   // Send the response with 'meta' and 'data'
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Members retrieved successfully!",
//     data: result.members, // List of members
//     meta: paginationMeta, // Pagination info
//   });
// });

// export const getAllMembers = catchAsync(async (req, res) => {
//   const { id, role, page } = req.query; // Extract query parameters

//   const filter = {};
//   if (id) {
//     filter._id = id; // Search by ID
//   }
//   if (role) {
//     filter.role = role; // Search by role
//   }

//   const result = await getAllMemberService(filter, Number(page) || 1);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Members retrieved successfully!",
//     data: result.members,
//     meta: {
//       totalMembers: result.totalMembers,
//       totalPages: result.totalPages,
//       currentPage: result.currentPage,
//       pageSize: 10, // Explicitly specify page size
//     },
//   });
// });

export const getAllMembers = catchAsync(async (req, res) => {
  const { id, role, page } = req.query;

  const filter = {};
  if (id) {
    filter._id = id;
  }
  if (role) {
    filter.role = role;
  }

  const result = await getAllMemberService(filter, Number(page) || 1);

  // Log for debugging (optional)
  // console.log("Service Result:", result);

  // Always return meta, even if values are 0
  const paginationMeta = {
    totalMembers: result.totalMembers ?? 0,
    totalPages: result.totalPages ?? 0,
    currentPage: result.currentPage ?? 1,
    pageSize: 10,
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully!",
    data: result.members,
    meta: paginationMeta,
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
  const updatedMember = await updateMemberProfilePicService(
    req.params.id,
    data
  );
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

// -------- send reset password email

export const sendForgetPasswordEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await sendForgetPasswordEmailService(email);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result.message,
      data: { timeRemaining: result.timeRemaining }, // Include timeRemaining in response
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};


//--------------  resetting the password
export const resetPasswordController = async (req, res) => {
  const { id } = req.query; 
  const { newPassword, token } = req.body;

  try {
    const result = await resetPasswordService(id, token, newPassword);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password updated successfully!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: error.message,
    });
  }
};



// Controller function to handle pagination and uniqueId filter
export const getAllMemberByFilterController = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const uniqueId = req.query.uniqueId || null;

  const result = await getAllMemberByFilterService(page, limit, uniqueId);

  if (result.message) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: result.message,
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully!",
    data: result,
  });
});





