import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { deleteToolService, getAllToolsService, saveToolsService, updateToolService } from "./tools.service.js";

//------- save tools

export const saveToolsController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const tools = await saveToolsService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tools saved successfully!",
      data: tools,

    });
  });

  //------- get al

  export const getAllToolsController = catchAsync(async (req,res)=>{
    const getAllTools = await getAllToolsService();
  
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:"All tools is retrived successfully",
      data:getAllTools
    })
   }) 
  

 //------- update tool

export const updateToolController = async (req, res) => {
  const { id } = req.params; 
  const updatedData = req.body;

  try {
    const updatedInfo = await updateToolService(id, updatedData);

    if (!updatedInfo) {
      return res
        .status(404)
        .json({ message: "Record not found or no update performed." });
    }

    res.status(200).json({
      message: "Tool Info updated successfully!",
      data: updatedInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating tool Info",
      error: error.message,
    });
  }
};



//-------- delete  
export const deleteToolController = catchAsync(async (req,res)=>{
  const id = req.params.id;

  const requests = await deleteToolService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tool is deleted successfully!",
    data: requests,
  });
})


