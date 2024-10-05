
import httpStatus from 'http-status';
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { updateAttendanceService } from './attendance.service.js';

export const updateAttendanceController = catchAsync(async (req, res) => {
  const { attendanceId, otp } = req.body; // Expecting attendanceId and OTP from request body

  const updatedAttendance = await updateAttendanceService(attendanceId, otp);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance updated successfully!',
    data: updatedAttendance
  });
})
