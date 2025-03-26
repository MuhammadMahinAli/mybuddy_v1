import { CronJob } from "cron";
import { ProjectJoinRequest } from "../projectJoinRequest/projectJoinRequest.model.js";
import { Member } from "../member/member.model.js";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc.js";
// import timezone from "dayjs/plugin/timezone.js";
import moment from "moment-timezone";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { Meeting } from "./meeting.model.js";


// Extend dayjs to support timezone handling
// dayjs.extend(utc);
// dayjs.extend(timezone);

// Function to generate OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};
console.log(process.env.NODEMAIL_PASS, process.env.NODEMAIL_USER);
// Function to generate attendance link with OTP   https://researchbdy.com/    https://researchbdy.com
const generateAttendanceLink = (otp, meetingId) => {
  const baseUrl = "https://researchbdy.com/attendance";
  const currentDate = moment().format("YYYY-MM-DD"); // Generate today's date in 'YYYY-MM-DD' format
  return `${baseUrl}?otp=${otp}&meetingId=${meetingId}&date=${currentDate}`;
};



// Function to send initial email and schedule reminders
export const sendAndScheduleAttendanceEmailService = async (meeting) => {
  console.log("Entered sendAndScheduleAttendanceEmailService...");
  console.log("Meeting Details:", meeting);
  const {
    meetingMembers,
    creator,
    meetingPlatform,
    title,
    meetingTime,
    timeZone,
    repeat,
    customDays,
    duration,
    endDate,
  } = meeting;

  try {
    console.log(
      "Processing sendAndScheduleAttendanceEmailService with meeting:",
      meeting
    );

    // Setup email transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAIL_USER,
        pass: process.env.NODEMAIL_PASS,
      },
    });



    // Fetch meeting members by their IDs
    const memberIds = meetingMembers.map((member) => member.memberId);
    const members = await Member.find({ _id: { $in: memberIds } });

    if (!members || members.length === 0) {
      console.log("No members found with the given member IDs.");
      return;
    }

    // Log the email of each member
    members.forEach((member) => {
      console.log(`Member ID: ${member._id}, Email: ${member.email}`);
    });

    // Fetch the creator details by creator's ID
    const creatorDetails = await Member.findById(creator);

    // Generate OTP and attendance link
    let otp = generateOtp();
    let generatedAttendanceLink = generateAttendanceLink(otp, meeting?._id);

    // Function to convert time to user's local timezone and format it
    const formatMeetingTime = (meetingTime, timeZone) => {
      return moment(meetingTime).tz(timeZone).format("h:mm A"); // Formats time to 12-hour format (e.g., 3:30 PM)
    };

    const localTime = formatMeetingTime(meetingTime, timeZone);

    // Function to send email
    const sendEmail = async (to, subject, html) => {
      await transporter.sendMail({
        from: process.env.NODEMAIL_USER,
        to,
        subject,
        html,
      });
    };

    // customize email for meeting member

    const generateMeetingReminderEmailForMember = (
      user,
      title,
      meetingPlatform
    ) => {
      const meetingLink = meetingPlatform.link;
      
      //const localTime = formatMeetingTime(meetingTime, user.timeZone);
      return `
        <div style="font-family: Arial, sans-serif;">
          <img src="https://i.ibb.co/g9fcnQq/logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
          <p style="padding-top: 10px;">Dear ${user.name.firstName} ${user.name.lastName},</p>
          <p>This is a reminder for the upcoming meeting titled "<strong>${title}</strong>".</p>
          <p>Please join the meeting at <strong>${localTime}</strong> using the following link:</p>
          <p><a href="${meetingLink}" style="color: #3498db;">Join Meeting</a></p>
          <p>If you have any questions or need further information, feel free to reach out.</p>
          <p>Best regards,</p>
          <p>The Research Buddy Team</p>
        </div>
      `;
    };

    // -------customize email for meeting creator

    const generateCreatorEmailForCreator = (
      creatorDetails,
      title,
      meetingPlatform,
      otp
    ) => {
      const meetingLink = meetingPlatform.link;

      return `
        <div style="font-family: Arial, sans-serif;">
          <img src="https://i.ibb.co/g9fcnQq/logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
          <p style="padding-top: 10px;">Dear ${creatorDetails.name.firstName} ${creatorDetails.name.lastName},</p>
          <p>You are the organizer of the upcoming meeting titled "<strong>${title}</strong>".</p>
          <p>Please join the meeting at <strong>${localTime}</strong> using the following link:</p>
          <p><a href="${meetingLink}" style="color: #3498db;">Join Meeting</a></p>
          <p>The OTP is also provided below. Don't forget to share with your team member during meeting. It's really important to recored their attendence. OTP will be valid for 5 minutes after meeting duration.</p>
          <p>The OTP= ${otp}</p>
          <p>Best regards,</p>
          <p>The Research Buddy Team</p>
        </div>
      `;
    };

    // Schedule reminder emails 30 minutes before the meeting
    const meetingDate = moment.tz(meetingTime, timeZone);
    const reminderTime = meetingDate.clone().subtract(30, "minutes"); // Reminder 30 minutes before the meeting
    const meetingEndDate = moment(endDate).endOf("day"); // Ensure endDate is considered until the end of the day

    // Check if the current date is before the endDate
    const isBeforeEndDate = moment().isBefore(meetingEndDate);

    const jobFunction = async () => {
      const meetingId = meeting._id;
      const meetingTime = meeting.meetingTime;

      try {
        const dayMap = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        };

        const today = new Date().getDay();

        // Check if today's day matches any of the custom days before proceeding
        if (
          Array.isArray(customDays) &&
          customDays.some((day) => dayMap[day] === today)
        ) {
          console.log(`Today matches one of the custom days: ${customDays}`);

          console.log("Executing cron job for reminders and creator's email!");

          // Proceed with sending the reminder emails to the team members
          for (const member of members) {
            console.log(`Sending reminder email to member: ${member.email}`);
            await sendEmail(
              member.email,
              `Research Buddy: Reminder of the meeting for ${title}`,
              generateMeetingReminderEmailForMember(
                member,
                title,
                meetingPlatform
              )
            );

            // Check if the attendance entry already exists for the member
            const existingMeeting = await Meeting.findOne(
              { _id: meeting._id, "meetingMembers.memberId": member._id },
              { "meetingMembers.$": 1 } // Projection to get only the meeting member entry
            );

            if (existingMeeting) {
              const memberAttendance =
                existingMeeting.meetingMembers[0].attendance;

              // Check if the attendance for this meeting date already exists
              const attendanceExists = memberAttendance.some(
                (attendance) =>
                  attendance.meetingDate.toISOString() ===
                  meetingTime.toISOString()
              );

              // If it doesn't exist, push the new attendance entry
              if (!attendanceExists) {
                console.log(`Updating attendance for member ${member._id}`);
                await Meeting.updateOne(
                  { _id: meeting._id, "meetingMembers.memberId": member._id },
                  {
                    $push: {
                      "meetingMembers.$.attendance": {
                        meetingDate: meetingTime,
                        isAttend: false,
                      },
                    },
                  }
                );
              } else {
                console.log(
                  `Attendance for member ${member._id} on ${meetingTime} already exists, skipping...`
                );
              }
            }
          }

          // Send the email to the creator with meeting and attendance link
          console.log(
            `Sending meeting details to creator: ${creatorDetails.email}`
          );
          await sendEmail(
            creatorDetails.email,
            `Meeting Details for ${title} - Attendance Link`,
            generateCreatorEmailForCreator(
              creatorDetails,
              title,
              meetingPlatform,
              otp
            )
          );

          //  Update the attendance link of the meeting and schedule link nullification
          const updatedMeeting = await Meeting.findByIdAndUpdate(
            meetingId,
            { $set: { attendenceLink: otp }},
            { new: true }
          );

          if (updatedMeeting) {
            console.log(`Updated attendance link for meeting ${meetingId}}`);
          } else {
            console.log(
              `Failed to update attendance link for meeting ${meetingId}.`
            );
          }

         // const totalOTPValidityPeriod = 30*1000
         // console.log("timeout", totalOTPValidityPeriod);
          // Set a timer to execute the update after 1 minute and 30 seconds

           const additionalMinutes = 30 + 5;
           const totalDuration = duration + additionalMinutes;

          // Calculate the total OTP validity period (30 seconds + total duration in minutes)
          const totalOTPValidityPeriod = 30000 + totalDuration * 60 * 1000;

          setTimeout(async () => {
            const currentDate = moment().format("YYYY-MM-DD");
            try {
              const updatedMeeting = await Meeting.findByIdAndUpdate(
                meetingId,
                {
                  $set: {
                    attendenceLink: null,
                  },
                },
                { new: true }
              );

              if (updatedMeeting) {
                console.log(`Updated attendance link for meeting ${meetingId}`);
              } else {
                console.log(
                  `Failed to update attendance link for meeting ${meetingId}.`
                );
              }
            } catch (error) {
              console.error("Error updating attendance link:", error);
            }
          }, totalOTPValidityPeriod);
        } else {
          console.log(
            "Today does not match any custom days, skipping email sending."
          );
        }
      } catch (error) {
        console.error("Error executing cron job:", error);
      }
    };

    if (isBeforeEndDate) {
      // Schedule the reminder emails
      const reminderJob = new CronJob(reminderTime.toDate(), jobFunction);
      reminderJob.start();
      console.log("Reminder and creator email cron job scheduled");
    }

    return { generatedAttendanceLink, otp };
  } catch (error) {
    console.error("Error in sendAndScheduleAttendanceEmailService:", error);
    throw error;
  }
};





export const createMeetingService = async (meetingData) => {
  const meeting = await Meeting.create(meetingData);

  // Save the meeting
  await meeting.save();

  // Check conditions before sending emails
  if (!meeting.meetingMembers || meeting.meetingMembers.length === 0) {
    throw new Error("No meeting members to send emails to.");
  }


// Ensure meeting time is in the future
if (new Date(meetingData.meetingTime) <= new Date()) {
  throw new Error("Meeting time must be set to a future date.");
}

  if (
    meeting.repeat === "custom" &&
    (!meeting.customDays || meeting.customDays.length === 0)
  ) {
    throw new Error("Custom repeat meetings must have valid custom days.");
  }
  console.log("About to call sendAndScheduleAttendanceEmailService...");
  try {
    await sendAndScheduleAttendanceEmailService(meeting);
    console.log("Emails and reminders scheduled successfully.");
  } catch (error) {
    console.error("Error scheduling meeting emails:", error.message);
  }
  console.log("After calling sendAndScheduleAttendanceEmailService...");
  // try {
  //   await sendAndScheduleAttendanceEmailService(meeting);
  //   console.log("Emails and reminders scheduled successfully.");
  // } catch (error) {
  //   console.error("Error scheduling meeting emails:", error.message);
  // }

  return meeting;
};

//---------- get specific meeting
export const getSingleMeeting = async (id) => {
  const meeting = await Meeting.findOne({ _id: id });
  return meeting;
};

// Update the attendance of a specific member in a meeting
export const updateMemberAttendance = async (
  meetingId,
  memberId,
  meetingDate
) => {
  try {
    const meeting = await Meeting.findOneAndUpdate(
      {
        _id: meetingId,
        "meetingMembers.memberId": memberId,
        "meetingMembers.attendance.meetingDate": meetingDate,
      },
      {
        $set: { "meetingMembers.$[outer].attendance.$[inner].isAttend": true },
      },
      {
        new: true,
        arrayFilters: [
          { "outer.memberId": memberId },
          { "inner.meetingDate": meetingDate },
        ],
      }
    );

    return meeting;
  } catch (error) {
    throw new Error("Failed to update member attendance");
  }
};

//---------- get meeting of specific user
// export const getMeetingByCreatorService = async (id) => {
//   const meetingByCreator = await Meeting.find({creator : id })
//     .populate("creator","name email profilePic")
//     .populate("meetingMembers.memberId","name email profilePic")
//     .populate("projectId", "projectName")
//     .sort({ createdAt: -1 });
//   return meetingByCreator;
// };

// export const getMeetingByCreatorService = async (memberId, filters) => {
//   const { filterType, subFilter } = filters; // Extract filter values
//   const currentDate = new Date();
//   const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));
//   const endOfToday = new Date(currentDate.setHours(23, 59, 59, 999));

//   // Base Query: Match meetings where the user is a member or the creator
//   let query = {
//     $or: [
//       { "meetingMembers.memberId": memberId },
//       { creator: memberId },
//     ],
//   };

//   // Helper function to calculate date ranges
//   const calculateDateRange = (days) => {
//     const endDate = new Date();
//     endDate.setDate(currentDate.getDate() + days);
//     return { $gte: currentDate, $lte: endDate };
//   };

//   // Apply Date Filters Based on filterType
//   if (filterType === "Today") {
//     query.meetingTime = { $gte: startOfToday, $lte: endOfToday };
//   } else if (filterType === "Weekly") {
//     query.meetingTime = calculateDateRange(7);
//   } else if (filterType === "Monthly") {
//     const endOfMonth = new Date(currentDate);
//     endOfMonth.setMonth(currentDate.getMonth() + 1);
//     query.meetingTime = { $gte: currentDate, $lte: endOfMonth };
//   }

//   // Apply Subfilters Based on subFilter
//   if (subFilter === "upcoming") {
//     query.meetingTime = { $gte: new Date() };
//   } else if (subFilter === "absent") {
//     query["meetingMembers.attendance"] = false;
//   } else if (subFilter === "attend") {
//     query["meetingMembers.attendance"] = true;
//   }

//   try {
//     const meetings = await Meeting.find(query)
//       .populate("creator", "name profilePic")
//       .populate("meetingMembers.memberId", "name profilePic")
//       .exec();

//     return meetings;
//   } catch (error) {
//     console.error("Error fetching meetings:", error);
//     throw new Error("Failed to fetch meetings");
//   }
// };

// export const getMeetingByCreatorService = async (memberId, filters) => {
//   const { filterType = "Monthly", subFilter = "all" } = filters; // Default values
//   const currentDate = new Date();
//   const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));
//   const endOfToday = new Date(currentDate.setHours(23, 59, 59, 999));

//   // Base Query: Match meetings where the user is a member or the creator
//   let query ={ creator: memberId };
 


//   // Helper function to calculate date ranges
//   const calculateDateRange = (days) => {
//     const endDate = new Date();
//     endDate.setDate(currentDate.getDate() + days);
//     return { $gte: currentDate, $lte: endDate };
//   };

//   // Apply Date Filters Based on filterType
//   if (filterType === "Today") {
//     query.meetingTime = { $gte: startOfToday, $lte: endOfToday };
//   } else if (filterType === "Weekly") {
//     const startOfWeek = new Date();
//     startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//     query.meetingTime = {
//       $gte: startOfWeek,
//       $lte: calculateDateRange(7).$lte,
//     };
//   } else if (filterType === "Monthly") {
//     const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//     query.meetingTime = { $gte: currentDate, $lte: endOfMonth };
//   }

//   // Apply Subfilters Based on subFilter
//   if (subFilter === "upcoming") {
//     query.meetingTime = { $gte: new Date() };
//   } else if (subFilter === "absent") {
//     query["meetingMembers.attendance"] = false;
//   } else if (subFilter === "attend") {
//     query["meetingMembers.attendance"] = true;
//   }

//   try {
//     const meetings = await Meeting.find(query)
//       .populate("creator", "name profilePic")
//       .populate("meetingMembers.memberId", "name profilePic")
//       .exec();

//     return meetings;
//   } catch (error) {
//     console.error("Error fetching meetings:", error);
//     throw new Error("Failed to fetch meetings");
//   }
// };

export const getMeetingByCreatorService = async (memberId, filters) => {
  const { filterType = "Monthly", subFilter = "all" } = filters;
  const currentDate = new Date();
  const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));
  const endOfToday = new Date(currentDate.setHours(23, 59, 59, 999));

  // Base Query: Fetch meetings created by the user
  let query = { creator: memberId };

  // Helper function to calculate date ranges
  const calculateDateRange = (days) => {
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + days);
    return { $gte: currentDate, $lte: endDate };
  };

  // Apply Date Filters Based on filterType
  if (filterType === "Today") {
    query.meetingTime = { $gte: startOfToday, $lte: endOfToday };
  } else if (filterType === "Weekly") {
    const startOfWeek = new Date();
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    query.meetingTime = {
      $gte: startOfWeek,
      $lte: calculateDateRange(7).$lte,
    };
  } else if (filterType === "Monthly") {
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    query.meetingTime = { $gte: currentDate, $lte: endOfMonth };
  }

  // Apply Subfilters
  if (subFilter === "upcoming") {
    const now = new Date();
    query.meetingTime = { ...query.meetingTime, $gte: now }; // Only future meetings today or later
    query.endDate = { $gte: now }; // Exclude meetings past their endDate
  }
  else if (subFilter === "all") {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    query.meetingTime = { $gte: startOfMonth, $lte: endOfMonth }; // All meetings this month
  }

  try {
    //console.log("Query:", JSON.stringify(query, null, 2)); // Debugging query
    const meetings = await Meeting.find(query)
      .populate("creator", "name profilePic")
      .populate("meetingMembers.memberId", "name profilePic")
      .sort({ createdAt: -1 })
      .exec();

    return meetings;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw new Error("Failed to fetch meetings");
  }
};


//-------- meeting member

// export const getMeetingsByMeetingMember = async (memberId) => {
//   //console.log("Member ID:", memberId);
//   const meetings = await Meeting.find({
//     "meetingMembers.memberId": memberId,
//   })
//     .populate("projectId")
//     .populate("creator")
//     .populate("meetingMembers.memberId")
//     .sort({ createdAt: -1 });
//   return meetings;
// };


export const getMeetingsByMeetingMember = async (memberId, filters) => {
  console.log("member", memberId);
  const { filterType = "Monthly", subFilter = "all" } = filters;
  const currentDate = new Date();
  const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const endOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

  let query = {
    "meetingMembers.memberId": memberId,
  };

  // Apply Date Filters Based on filterType
  if (filterType === "Today") {
    query.meetingTime = { $gte: startOfToday, $lte: endOfToday };
  } else if (filterType === "Weekly") {
    const startOfWeek = new Date();
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    query.meetingTime = { $gte: startOfWeek, $lte: endOfWeek };
  } else if (filterType === "Monthly") {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    query.meetingTime = { $gte: startOfMonth, $lte: endOfMonth };
  }

  // Apply Subfilters
  if (subFilter === "upcoming") {
    query.meetingTime = { ...query.meetingTime, $gte: currentDate }; // Future meetings only
    query.endDate = { $gte: currentDate }; // Exclude meetings past their endDate
  } else if (subFilter === "attend") {
    query["meetingMembers.attendance.isAttend"] = true; // Meetings attended by the member
  } else if (subFilter === "absent") {
    query["meetingMembers.attendance.isAttend"] = false; // Meetings not attended by the member
  }

  try {
    const meetings = await Meeting.find(query)
      .populate("projectId")
      .populate("creator")
      .populate("meetingMembers.memberId")
      .sort({ createdAt: -1 });

    return meetings;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw new Error("Failed to fetch meetings");
  }
};


// update attendence

export const updateMembersAttendanceStatus = async (
  meetingId,
  meetingTime,
  otp,
  memberId
) => {
  console.log(meetingId);
  try {
    // Find the meeting with the given criteria
    const meeting = await Meeting.findOne({
      _id: meetingId,
      meetingTime,
      attendenceLink: { $regex: otp }, // Match OTP as part of the attendance link
      "meetingMembers.memberId": memberId,
    });

    // Log the meeting object to check if it is found
    console.log("Meeting:", meeting);

    // If the meeting is not found, return null
    if (!meeting) {
      console.log("No meeting found with the provided criteria.");
      return null;
    }

    // Update the isAttend field for the specific meetingMember and meetingDate
    const updatedMeeting = await Meeting.updateOne(
      { _id: meetingId, "meetingMembers.memberId": memberId },
      { $set: { "meetingMembers.$[member].attendance.$[att].isAttend": true } },
      {
        arrayFilters: [
          { "member.memberId": memberId },
          { "att.meetingDate": new Date(meetingTime).toISOString() },
        ],
      }
    );

    console.log("Updated Meeting:", updatedMeeting);

    return updatedMeeting;
  } catch (error) {
    throw new Error("Error updating attendance status: " + error.message);
  }
};

//---- get filtered meeting status
 // Adjust the path based on your project structure

// Function to get meetings based on userId and filter
export const getMeetingsByStatus = async (userId, filter) => {
  let startDate, endDate;
  const currentDate = new Date();

  // Determine the date range based on the filter
  if (filter === "today") {
    startDate = new Date(currentDate.setHours(0, 0, 0, 0));
    endDate = new Date(currentDate.setHours(23, 59, 59, 999));
  } else if (filter === "weekly") {
    startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    endDate = new Date(currentDate.setDate(startDate.getDate() + 6));
  } else if (filter === "monthly") {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  } else {
    throw new Error("Invalid filter type. Use 'today', 'weekly', or 'monthly'.");
  }

  // Query meetings where the user is a member
  const meetings = await Meeting.find({
    meetingMembers: { $elemMatch: { memberId: userId } },
    meetingTime: { $gte: startDate, $lte: endDate },
  });

  // Calculate the total, upcoming, and absent meetings
  const totalMeetings = meetings.length;
  const upcomingMeetings = meetings.filter(meeting => new Date(meeting.meetingTime) > new Date()).length;
  const absentMeetings = meetings.filter(meeting => {
    const member = meeting.meetingMembers.find(member => member.memberId.toString() === userId);
    return member && member.attendance.some(att => !att.isAttend && att.meetingDate <= new Date());
  }).length;

  return { totalMeetings, upcomingMeetings, absentMeetings };
};


//--- update meeting 
export const updateMeetingService = async (id, updatedMeetingData) => {
  if (!id) {
    throw new Error("Meeting ID is required.");
  }

  const updatedMeeting = await Meeting.findByIdAndUpdate(
    id,
    updatedMeetingData,
    { new: true } // Ensures we get the updated document
  );

  if (!updatedMeeting) {
    throw new Error("Meeting not found or could not be updated.");
  }

  return updatedMeeting;
};

//----------------- delete meeting

export const deleteMeetingService = async (id) => {
  const result = await Meeting.findByIdAndDelete({ _id: id });
  return result;
};
