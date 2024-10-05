import { CronJob } from "cron";
import { ProjectJoinRequest } from "../projectJoinRequest/projectJoinRequest.model.js";
import { Member } from "../member/member.model.js";
import { Meeting } from "./meeting.model.js";
import moment from "moment-timezone";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Function to generate OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};

// Function to generate attendance link with OTP
const generateAttendanceLink = (otp) => {
  const baseUrl = "http://localhost:5173/attendance";
  return `${baseUrl}?otp=${otp}`;
};

//convert duration
const convertDurationToMinutes = (meetingDuration) => {
  const timeParts = meetingDuration.match(/(\d+)\s*(hour|hours|minute|minutes)/g);
  let totalMinutes = 0;

  if (timeParts) {
    for (const part of timeParts) {
      const [value, unit] = part.split(" ");
      const numericValue = parseInt(value);

      // Check for hours (singular and plural)
      if (unit.startsWith("hour")) {
        totalMinutes += numericValue * 60; // Convert hours to minutes
      }
      // Check for minutes (singular and plural)
      else if (unit.startsWith("minute")) {
        totalMinutes += numericValue; // Minutes remain as is
      }
    }
  }

  return totalMinutes;
};

const meetingDuration = "1 hours 10 minute";
const totalMinutesForMeeting = convertDurationToMinutes(meetingDuration);
console.log(`Total meeting duration in minutes: ${totalMinutesForMeeting}`);

// Function to send initial email and schedule reminders
export const sendAndScheduleAttendanceEmailService = async (meeting) => {
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
    const otp = generateOtp();
    const generatedAttendanceLink = generateAttendanceLink(otp);

    // Function to convert time to user's local timezone and format it
    const formatMeetingTime = (meetingTime, timeZone) => {
      return moment(meetingTime).tz(timeZone).format('h:mm A'); // Formats time to 12-hour format (e.g., 3:30 PM)
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

    const generateMeetingReminderEmailForMember = (user, title, meetingPlatform) => {
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

    const generateCreatorEmailForCreator = (creatorDetails, title, meetingPlatform, generatedAttendanceLink) => {
      const meetingLink = meetingPlatform.link;
    
      return `
        <div style="font-family: Arial, sans-serif;">
          <img src="https://i.ibb.co/g9fcnQq/logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
          <p style="padding-top: 10px;">Dear ${creatorDetails.name.firstName} ${creatorDetails.name.lastName},</p>
          <p>You are the organizer of the upcoming meeting titled "<strong>${title}</strong>".</p>
          <p>Please join the meeting at <strong>${localTime}</strong> using the following link:</p>
          <p><a href="${meetingLink}" style="color: #3498db;">Join Meeting</a></p>
          <p>The attendance link is also provided below. Don't forget to share with your team member during meeting. It's really important to recored their attendence. OTP will be valid for 5 minutes after meeting duration.</p>
          <p>${generatedAttendanceLink}</p>
          <p>If you have any questions or need further assistance, feel free to contact us.</p>
          <p>Best regards,</p>
          <p>The Research Buddy Team</p>
        </div>
      `;
    };

    // Schedule reminder emails 30 minutes before the meeting
    const meetingDate = moment.tz(meetingTime, timeZone);
    const reminderTime = meetingDate.clone().subtract(30, "minutes"); // Reminder 30 minutes before the meeting

    // Cron job function for sending the reminder email and email to the creator

    const jobFunction = async () => {
      try {
        console.log("Executing cron job for reminders and creator's email!");

        const meetingId = meeting._id;
        const meetingTime = meeting.meetingTime;

        // Send reminder emails to the team members
        for (const member of members) {
          console.log(`Sending reminder email to member: ${member.email}`);
          await sendEmail(
            member.email,
            `Research Buddy: Reminder of the meeting for ${title}`,
            generateMeetingReminderEmailForMember(member, title, meetingPlatform)
          );

          // Check if the attendance entry already exists for the member
          const existingMeeting = await Meeting.findOne(
            { _id: meetingId, "meetingMembers.memberId": member._id },
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
                { _id: meetingId, "meetingMembers.memberId": member._id },
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

        // Generate attendance link with OTP
        
        // const otp = generateOtp(); // Assume you have a function to generate OTP
        // const attendanceLink = generateAttendanceLink(otp);
        console.log("generated link otp", generatedAttendanceLink);


        // Send the email to the creator with meeting and attendance link
        console.log(
          `Sending meeting details to creator: ${creatorDetails.email}`
        );
        await  sendEmail(
          creatorDetails.email,
          `Meeting Details for ${title} - Attendance Link`,
          generateCreatorEmailForCreator(creatorDetails, title, meetingPlatform, generatedAttendanceLink)
        );;

        // Update the attendance link of the meeting
   // Use findByIdAndUpdate to update the attendance link of the meeting
   const updatedMeeting = await Meeting.findByIdAndUpdate(
    meetingId,
    { $set: { attendenceLink: generatedAttendanceLink } },
    { new: true }
  );

  if (updatedMeeting) {
    console.log(`Updated attendance link for meeting ${meetingId}}`);
  } else {
    console.log(`Failed to update attendance link for meeting ${meetingId}.`);
  }

  // Calculate the total validity period in milliseconds
  const durationInMinutes = convertDurationToMinutes(duration); // Get duration from meeting details
  const totalValidityPeriod = (30 + durationInMinutes + 5) * 60 * 1000; // 30 min + duration + 5 min in milliseconds

  // Set a timeout to update the attendanceLink to null after the validity period
  setTimeout(async () => {
    const nullifyLink = await Meeting.findByIdAndUpdate(
      meetingId,
      { $set: { attendanceLink: null } },
      { new: true }
    );

    if (nullifyLink) {
      console.log(`Attendance link for meeting ${meetingId} set to null after expiration.`);
    } else {
      console.log(`Failed to nullify attendance link for meeting ${meetingId}.`);
    }
  }, totalValidityPeriod)
      } catch (error) {
        console.error("Error executing cron job:", error);
      }
    };

    // Schedule the reminder emails
    const reminderJob = new CronJob(reminderTime.toDate(), jobFunction);
    reminderJob.start();
    console.log("Reminder and creator email cron job scheduled");

    // If repeat is set to "everyday"
    if (repeat === "everyday") {
      console.log("Setting up daily email reminders...");
      const dailyJob = new CronJob("0 0 * * *", jobFunction); // Executes at midnight every day
      dailyJob.start();
      console.log("Daily reminder cron job scheduled");
    } else if (
      repeat === "custom" &&
      Array.isArray(customDays) &&
      customDays.length > 0
    ) {
      const dayMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      };

      customDays.forEach((day) => {
        const dayOfWeek = dayMap[day];
        if (dayOfWeek !== undefined) {
          console.log(`Scheduling for custom day: ${day}`);
          const customJob = new CronJob(reminderTime.toDate(), jobFunction);
          customJob.start();
        }
      });
    }

    return { generatedAttendanceLink , otp };
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

  if (!meeting.meetingTime || moment(meeting.meetingTime).isBefore(moment())) {
    throw new Error("Meeting time must be set to a future date.");
  }

  if (
    meeting.repeat === "custom" &&
    (!meeting.customDays || meeting.customDays.length === 0)
  ) {
    throw new Error("Custom repeat meetings must have valid custom days.");
  }

  try {
    await sendAndScheduleAttendanceEmailService(meeting);
  } catch (error) {
    console.error("Error scheduling meeting emails:", error.message);
  }

  return meeting;
};
