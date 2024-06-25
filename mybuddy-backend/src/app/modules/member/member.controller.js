import {createMemberService,getAllMemberService,getSingleMember,updateMemberCoverPicService,updateMemberInfoService,updateMemberProfilePicService,updateMemberService} from "./member.service.js";
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import httpStatus from "http-status";

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