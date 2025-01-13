import { Schema, model } from "mongoose";

const MeetingSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    meetingMembers: [
      {
        memberId: { 
          type: Schema.Types.ObjectId, 
          ref: "Member", 
          required: true,
        },
        attendance: [
          {
            meetingDate: { 
              type: Date, 
              required: true 
            },
            isAttend: { 
              type: Boolean, 
              default: false 
            },
          },
        ],
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    meetingPlatform: {
      platform: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
    duration: {
      type: Number,
      required: true,
    },
    meetingTime: {
      type: Date,
      required: true,
    },
    timeZone: {
      type: String,
      required: true,
    },
    repeat: {
      type: String,
      enum: ["dontRepeat", "everyday", "custom"],
      required: true,
    },
    weeklyRepeat: {
      type: Number,
      required: true,
    },
    endDate:{ type: Date, required: true },
    customDays: [
      {
        type: String,
      },
    ],
    attendenceLink: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

//create Meeting model

export const Meeting = model("Meeting", MeetingSchema);
// {

//   projectId: "6757928f1b2bbdd8f4efb208",
//   creator: "6756f592fc3c4b98bc1f344c",
//   meetingMembers: [],
//   title: "End-of-Week Review",
//   description: "Reviewing the progress made during the week.",
//   meetingPlatform: {
//     platform: "Microsoft Teams",
//     link: "https://teams.microsoft.com/end-of-week-review"
//   },
//   duration: 60,
//   meetingTime: "2024-12-31T17:00:00.000Z",
//   timeZone: "Asia/Dhaka",
//   repeat: "none",
//   customDays:  [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday"
// ],
//   attendenceLink: "link103",
//   createdAt: "2024-12-29T20:00:00.000Z",
//   updatedAt: "2024-12-29T20:00:00.000Z"
// }