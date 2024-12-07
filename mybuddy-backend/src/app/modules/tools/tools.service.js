import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Tools } from "./tools.model.js";

//  ---------- create payment and store stripe
export const saveToolsService = async (formData) => {
  try {
    const result = await Tools.create(formData);
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

//------------ get all

export const getAllToolsService = async () => {
  const getAllTools = await Tools.find({}).sort({
    createdAt: -1,
  });
  return getAllTools;
};

//------- update tool
export const updateToolService = async (id, updatedData) => {
  try {
    const updatedInfo = await Tools.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Returns the updated document and validates input
    );

    return updatedInfo;
  } catch (error) {
    throw new Error("Error updating Tool Info: " + error.message);
  }
};

// ------ delete tool

export const deleteToolService = async (id) => {
  const result = await Tools.findByIdAndDelete({ _id: id });
  return result;
};
