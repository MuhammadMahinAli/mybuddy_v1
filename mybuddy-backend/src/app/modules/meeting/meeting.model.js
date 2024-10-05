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
          ref: "ProjectJoinRequest", 
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
      type: String,
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
