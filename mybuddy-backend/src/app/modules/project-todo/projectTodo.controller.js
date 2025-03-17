//------- save todo

import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { getSingleMemberProjectTodoService, saveProjectTodoService } from "./projectTodo.service.js";


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