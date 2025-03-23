import {
  createMeetingService,
  deleteMeetingService,
  getMeetingByCreatorService,
  getMeetingsByMeetingMember,
  getMeetingsByStatus,
  getSingleMeeting,
  updateMeetingService,
  updateMemberAttendance,
  updateMembersAttendanceStatus,
} from "./meeting.service.js";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { Meeting } from "./meeting.model.js";

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

//------get single meeting
export const getSingleMeetingById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const metting = await getSingleMeeting(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meeting data retrieved successfully!",
    data: metting,
  });
});

// Controller function to update attendance status
export const updateAttendanceStatus = async (req, res) => {
  const { meetingId, memberId, meetingDate } = req.body;

  try {
    const updatedMeeting = await updateMemberAttendance(
      meetingId,
      memberId,
      meetingDate
    );

    if (updatedMeeting) {
      res.status(200).json({
        success: true,
        message: "Attendance status updated successfully!",
        data: updatedMeeting,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Meeting or member not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the attendance status.",
      error: error.message,
    });
  }
};

// -- meeting member

// export const getMeetingsForMeetingMemberController = async (req, res) => {
//   const { memberId } = req.params;

//   const meetings = await getMeetingsByMeetingMember(memberId);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Meeting of member retrieved successfully!",
//     data: meetings,
//   });
// };

export const getMeetingsForMeetingMemberController = catchAsync(async (req, res) => {
  const  memberId  = req.params.id; // Extract userId from query params
  const { filterType, subFilter } = req.query; // Extract filters
//console.log("mm", memberId, filterType);
  if (!memberId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required.",
    });
  }

  try {
    const meetings = await getMeetingsByMeetingMember(memberId, { filterType, subFilter });
    res.status(200).json({
      success: true,
      message: "Meetings fetched successfully",
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// update attendenc

export const updateMembersAttendanceStatusController = async (req, res) => {
  const { meetingId, meetingTime, otp, memberId } = req.body;

  try {
    // Step 1: Check if the meeting exists with the given meetingId
    const meeting = await Meeting.findOne({ _id: meetingId });
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found with the provided meeting ID.",
      });
    }
    // Step 2: Check if the meetingTime matches the provided meetingTime
    if (
      meeting.meetingTime.toISOString() !== new Date(meetingTime).toISOString()
    ) {
      return res.status(404).json({
        success: false,
        message: "Meeting time does not match the specified time.",
      });
    }

    // Step 3: Check if the OTP matches the one in the attendance link
    if (!meeting.attendenceLink.includes(otp)) {
      return res.status(404).json({
        success: false,
        message: "OTP does not match the specified meeting.",
      });
    }

    console.log("Member ID from request:", memberId);

    // Step 4: Check if the member exists in the meeting's meetingMembers list
    const member = meeting.meetingMembers.find(
      (m) => m.memberId.toString() === memberId.toString()
    );
    console.log("Matched Member:", member);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member ID does not match any member in this meeting.",
      });
    }

    // If all checks pass, update the attendance status
    const result = await updateMembersAttendanceStatus(
      meetingId,
      meetingTime,
      otp,
      memberId
    );

    res.status(200).json({
      success: true,
      message: "Attendance status updated successfully.",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};

// get meeting status by filter

// Controller function to handle the request and response for meeting status
export const getMeetingStatus = async (req, res) => {
  try {
    const { userId, filter } = req.query;

    // Check for the required parameters
    if (!userId || !filter) {
      return res
        .status(400)
        .json({ message: "userId and filter are required." });
    }

    // Call the service to get meeting data
    const { totalMeetings, upcomingMeetings, absentMeetings } =
      await getMeetingsByStatus(userId, filter);

    res.status(200).json({
      totalMeetings,
      upcomingMeetings,
      absentMeetings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

//------------- get meetings of creator

// export const getMeetingByCreatorController = catchAsync(async (req, res) => {
//   const meetings = await getMeetingByCreatorService(req?.params?.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "All meeting by creator retrived successfully",
//     data: meetings,
//   });
// });


export const getMeetingByCreatorController = catchAsync(async (req, res) => {
  const memberId = req.params.id; // Member ID from URL params
  const { filterType, subFilter } = req.query; // Filters from query parameters

  try {
    const meetings = await getMeetingByCreatorService(memberId, { filterType, subFilter });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meetings retrieved successfully",
      data: meetings,
    });
  } catch (error) {
    console.error("Error in getMeetingsByMemberController:", error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to fetch meetings",
      data: null,
    });
  }
});


//--------- update meeting 
export const updateMeetingController = async (req, res) => {
  const { id } = req.params; // Extract meeting ID from request params
  const updatedMeetingData = req.body; // Data sent in request body

  try {
    const updatedMeeting = await updateMeetingService(id, updatedMeetingData);
    res.status(200).json({
      success: true,
      message: "Meeting updated successfully.",
      data: updatedMeeting,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update meeting.",
    });
  }
};

//----------------- delete meeting


export const deleteMeetingController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const project = await deleteMeetingService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meeting deleted successfully!",
    data: project,
  });
});