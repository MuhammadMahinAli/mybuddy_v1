import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Todo } from "./todo.model.js";



//  ---------- save todo
export const saveTodoService = async (formData) => {
  try {
    const result = await Todo.create(formData);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to save tools."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};