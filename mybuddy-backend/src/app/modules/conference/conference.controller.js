import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import {
  deleteConferenceLinkService,
  getConferenceLinkService,
  saveConferenceLinkService,
  updateConferenceLinkService,
} from "./conference.service.js";

//------- save conferenceLink

export const saveConferenceLinkController = catchAsync(
  async (req, res, next) => {
    const data = req.body;
    console.log(data);
    const newPaymentInfo = await saveConferenceLinkService(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Conference Link service saved successfully!",
      data: newPaymentInfo,
    });
  }
);

//------- get conferenceLink

export const getConferenceLinkController = catchAsync(async (req, res) => {
  const getLink = await getConferenceLinkService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conference Link retrived successfully",
    data: getLink,
  });
});

//------- update conferenceLink

export const updateConferenceLinkController = async (req, res) => {
  const { id } = req.params;
  const { newConferenceLink } = req.body;

  try {
    const updatedInfo = await updateConferenceLinkService(
      id,
      newConferenceLink
    );

    if (!updatedInfo) {
      return res
        .status(404)
        .json({ message: "Record not found or no update performed." });
    }

    res.status(200).json({
      message: "Conference Link updated successfully!",
      data: updatedInfo,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating Conference Link",
        error: error.message,
      });
  }
};

//-------- delete conferenceLink

export const deleteConferenceLinkController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const requests = await deleteConferenceLinkService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conference Link deleted successfully!",
    data: requests,
  });
});
