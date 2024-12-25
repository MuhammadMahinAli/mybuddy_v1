import { Post } from "./post.model.js";
import { ApiError } from "../../../handleError/apiError.js";
import httpStatus from "http-status";
import mongoose from "mongoose";

//----------create post
export const createPost = async (postData) => {
  try {
    // Ensure teamMembers is an array of ObjectId references
    if (postData.teamMembers && Array.isArray(postData.teamMembers)) {
      postData.teamMembers = postData.teamMembers.map((member) => ({
        member: new mongoose.Types.ObjectId(member.member),
      }));
    }

    const result = await Post.create(postData);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create post"
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//--------get all post

// export const getAllPostService = async () => {
//   const posts = await Post.find({})
//     .populate("postedBy", "name email profilePic role")
//     .populate("teamMembers.member", "name profilePic role")
//     .sort({ createdAt: -1 });
//   return posts;
// };

export const getAllPostService = async (page , limit) => {
  try {
    const skip = (page - 1) * limit;

    // Fetch projects and populate user details
    const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("postedBy", "name email profilePic role").populate("teamMembers.member", "name profilePic role");
    const totalPage = await Post.countDocuments();

    return {
      posts,
      totalPages: Math.ceil(totalPage / limit),
      currentPage: page,
    };
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to retrieve posts");
  }
};


//-------get post of specific user

export const getSingleMemberPostService = async (userId) => {
  //console.log(`Fetching posts for user ID: ${userId}`);
  try {
    const posts = await Post.find({ postedBy: userId })
      .populate("postedBy")
      .populate("comments.commentedBy")
      .sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    throw new Error("Failed to fetch user's posts");
  }
};

//------------------ update post


export const updatePostService = async (id, updatedPostData) => {
  if (!id) {
    throw new Error("Post ID is required.");
  }
console.log(id, updatedPostData);
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    updatedPostData,
    { new: true } // Ensures we get the updated document
  );

  if (!updatedPost) {
    throw new Error("Post not found or could not be updated.");
  }

  return updatedPost;
};

//----------------- delete 

export const deletePostService = async (id) => {
  const result = await Post.findByIdAndDelete({ _id: id });
  return result;
};