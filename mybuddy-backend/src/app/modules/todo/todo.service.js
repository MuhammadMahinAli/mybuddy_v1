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

//-------get todo of specific user

export const getSingleMemberTodoService = async (id) => {
  try {
    const todos = await Todo.find({ "listedBy": id })
      .populate("listedBy") // Ensure this correctly references the Member model
      .sort({ createdAt: -1 });

    return todos;
  } catch (error) {
    console.error("Error fetching user's todos:", error);
    throw new Error("Failed to fetch user's todos");
  }
};

//------------------ update project todo


export const updateTodoService = async ( todoId, updatedTodoData) => {
  if ( !todoId) {
    throw new Error("Todo ID are required.");
  }

  console.log("Updating Todo:", { todoId, updatedTodoData });

   try {
      const updatedInfo = await Todo.findByIdAndUpdate(
        todoId,
        updatedTodoData,
        { new: true, } 
      );
  
      return updatedInfo;
    } catch (error) {
      throw new Error("Error updating Admin Bank Info: " + error.message);
    }

  // const updated = await Todo.findOneAndUpdate(
  //   { _id: projectId, "todos._id": todoId }, // Find project and specific todo
  //   {
  //     $set: {
  //       "todos.$": updatedTodoData, // Update only the matched todo
  //     },
  //   },
  //   { new: true } // Return the updated document
  // );

  // if (!updated) {
  //   throw new Error(" Todo not found or could not be updated.");
  // }

  // return updated;
};
