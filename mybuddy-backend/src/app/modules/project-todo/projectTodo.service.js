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

//------------------ update project todo


export const updateProjectTodoService = async (projectId, todoId, updatedTodoData) => {
  if (!projectId || !todoId) {
    throw new Error("Project ID and Todo ID are required.");
  }

  console.log("Updating Todo:", { projectId, todoId, updatedTodoData });

  const updatedProject = await ProjectTodo.findOneAndUpdate(
    { _id: projectId, "todos._id": todoId }, // Find project and specific todo
    {
      $set: {
        "todos.$": updatedTodoData, // Update only the matched todo
      },
    },
    { new: true } // Return the updated document
  );

  if (!updatedProject) {
    throw new Error("Project Todo not found or could not be updated.");
  }

  return updatedProject;
};


// Service function to add a new To-Do to a project
export const addTodoToProjectTodoService = async (projectId, todoData) => {
  try {
    // Find project by ID and add new To-Do to the 'todos' array
    const updatedProject = await ProjectTodo.findByIdAndUpdate(
      projectId,
      { $push: { todos: todoData } },
      { new: true } // Return updated document
    );

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;
  } catch (error) {
    throw error;
  }
};