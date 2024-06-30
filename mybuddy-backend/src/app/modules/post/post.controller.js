import {
  createPost,
  getAllPostService,
  getSingleMemberPostService,
} from "./post.service.js";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import httpStatus from "http-status";

//------create an user
export const createNewPost = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log(data);
  const newPost = await createPost(data);
  console.log(newPost);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post created successfully!",
    data: newPost,
  });
});

//-------get all users
export const getAllPost = catchAsync(async (req, res) => {
  const posts = await getAllPostService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrieved successfully!",
    data: posts,
  });
});

//---------get specific user post

// export const getSingleMemberPostController = async (req, res) => {
//   const userId = req.params.id;
//   const getPost = await getSingleMemberPostService(userId);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Get posts successfully!",
//     data: getPost,
//   });
// };
export const getSingleMemberPostController= async (req, res) => {
  const userId = req.params.id;

  
    const posts = await getSingleMemberPostService(userId);
  
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User's posts retrieved successfully",
      data: posts,
    });
  
};
