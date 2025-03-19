//------- save todo

import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { getSingleMemberProjectTodoService, saveProjectTodoService, updateProjectTodoService } from "./projectTodo.service.js";


export const saveProjectTodoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const tools = await saveProjectTodoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project Todo saved successfully!",
      data: tools,

    });
  });

  export const getSingleMemberProjectTodoController= async (req, res) => {
    const id = req.params.id;
  
    
      const posts = await getSingleMemberProjectTodoService(id);
    
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "User's Project Todo Service retrieved successfully",
        data: posts,
      });
    
  };

  //------------- update project todo

  export const updateProjectTodoController = async (req, res) => {
    const { projectId, todoId } = req.params; // Extract both project ID and todo ID
    const updatedTodoData = req.body;
  
    if (!projectId || !todoId) {
      return res.status(400).json({
        success: false,
        message: "Project ID and Todo ID are required.",
      });
    }
  
    try {
      console.log("Updating Todo:", { projectId, todoId, updatedTodoData });
  
      const updatedProject = await updateProjectTodoService(projectId, todoId, updatedTodoData);
  
      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: "Project or Todo not found.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Todo updated successfully!",
        data: updatedProject,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update the Todo.",
      });
    }
  };