import {
  createPost,
  deletePostService,
  getAllPostService,
  getSingleMemberPostService,
  updatePostService,
} from "./post.service.js";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import httpStatus from "http-status";

//------create an user
export const createNewPost = catchAsync(async (req, res, next) => {
  const data = req.body;
  //console.log(data);
  const newPost = await createPost(data);
  //console.log(newPost);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post created successfully!",
    data: newPost,
  });
});

//-------get all users

//-------get all posts with pagination

export const getAllPost = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const excludeIds = req.query.excludeIds ? req.query.excludeIds.split(",") : [];

  console.log(limit, excludeIds);

  const result = await getAllPostService(limit, excludeIds);

  if (!result.posts.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No posts found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrieved successfully!",
    data: result,
  });
});



// export const getAllPost = catchAsync(async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 5;

//   const result = await getAllPostService(page, limit);

//   if (result.message) {
//     return sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: result.message,
//       data: [],
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Posts is retrieved successfully!",
//     data: result,
//   });
// });

// export const getAllPost = catchAsync(async (req, res) => {


//   const result = await getAllPostService();

//   if (!result) {
//     return sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: "No posts found",
//       data: [],
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Posts retrieved successfully",
//     data: result,
//   });
// });


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

//------------- update post

export const updatePostController = async (req, res) => {
  const { id } = req.params; 
  const updatedPostData = req.body; 
  console.log(id, updatedPostData);

  try {
    const updatedPost = await updatePostService(id, updatedPostData);
    res.status(200).json({
      success: true,
      message: "Post updated successfully!",
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update post.",
    });
  }
};

//----------------- delete 


export const deletePostController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const project = await deletePostService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted successfully!",
    data: project,
  });
});