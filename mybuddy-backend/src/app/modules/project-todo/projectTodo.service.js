import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { ProjectTodo } from "./projectTodo.model.js";




//  ---------- save project todo
export const saveProjectTodoService = async (formData) => {
  try {
    const result = await ProjectTodo.create(formData);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to save project todo."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//-------get todo of specific user

export const getSingleMemberProjectTodoService = async (id) => {
  try {
    const todos = await ProjectTodo.find({ "listedBy": id })
      .populate("listedBy") // Ensure this correctly references the Member model
      .sort({ createdAt: -1 });

    return todos;
  } catch (error) {
    console.error("Error fetching user's todos:", error);
    throw new Error("Failed to fetch user's todos");
  }
};