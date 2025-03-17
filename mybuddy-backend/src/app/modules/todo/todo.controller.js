//------- save todo

import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { saveTodoService } from "./todo.service.js";

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