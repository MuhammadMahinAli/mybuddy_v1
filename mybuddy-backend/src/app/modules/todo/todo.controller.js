//------- save todo

import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { getSingleMemberTodoService, saveTodoService, updateTodoService } from "./todo.service.js";

export const saveTodoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const tools = await saveTodoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Todo saved successfully!",
      data: tools,

    });
  });

   export const getSingleMemberTodoController= async (req, res) => {
      const id = req.params.id;
    
      
        const posts = await getSingleMemberTodoService(id);
      
        res.status(200).json({
          statusCode: 200,
          success: true,
          message: "User's  Todo Service retrieved successfully",
          data: posts,
        });
      
    };
    //------------- update project todo
  
    export const updateTodoController = async (req, res) => {
      const {todoId } = req.params; // Extract both project ID and todo ID
      const updatedTodoData = req.body;
    
      if (!todoId) {
        return res.status(400).json({
          success: false,
          message: "Todo ID are required.",
        });
      }
    
      try {
        console.log("Updating Todo:", {  todoId, updatedTodoData });
    
        const updated = await updateTodoService( todoId, updatedTodoData);
    
        if (!updated) {
          return res.status(404).json({
            success: false,
            message: "Todo not found.",
          });
        }
    
        res.status(200).json({
          success: true,
          message: "Todo updated successfully!",
          data: updated,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message || "Failed to update the Todo.",
        });
      }
    };