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

export const getAllPostService = async () => {
  const posts = await Post.find({})
    .populate("postedBy")
    .populate("teamMembers.member")
    .sort({ createdAt: -1 });
  return posts;
};

//-------get post of specific user

export const getSingleMemberPostService = async (userId) => {
  //console.log(`Fetching posts for user ID: ${userId}`);
  try {
    const posts = await Post.find({ postedBy: userId })
      .populate("postedBy")
      .populate("comments.commentedBy");
    return posts;
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    throw new Error("Failed to fetch user's posts");
  }
};
