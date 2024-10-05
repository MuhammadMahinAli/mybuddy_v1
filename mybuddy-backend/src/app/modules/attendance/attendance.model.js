import { Schema, model } from "mongoose";

//Attendance;
const AttendanceSchema = new Schema(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "ProjectJoinRequest",
      required: true,
    },
    attended: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

//create Attendance model
export const Attendance = model("Attendance", AttendanceSchema);
