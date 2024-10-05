import { createMeetingService } from "./meeting.service.js";
import httpStatus from 'http-status';
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";

export const createMeetingController = catchAsync(async (req, res) => {
  const meetingData = req.body; 
  const meeting = await createMeetingService(meetingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meeting created successfully!",
    data: meeting,
  });
});
