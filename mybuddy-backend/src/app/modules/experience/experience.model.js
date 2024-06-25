import { Schema, model } from "mongoose";

const ExperienceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    companyName: {
      type: String,
      required: true,
    },
    companyLocation: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["On-site", "Remote", "Hybride"],
    },
    employeeType: {
      type: String,
      enum: ["Internship","Self-Employed","Full-time Employee", "Part-time Employee", "Temporary Employee","Seasonal","Leased Employee","At-will Employee"],
    },
  },
  {
    timestamps: true,
  }
);

//create experience model
export const Experience = model("Experience", ExperienceSchema);
