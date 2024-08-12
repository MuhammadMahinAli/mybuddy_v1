import { Schema, model } from "mongoose";

const ProjectJoinRequestSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    requestedTo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    status: {
      type: String,
      required: true,
      enum: ["Pending", "Accepted", "Rejected","Cancelled"],
    },
    tasks: [
      {
        title: {
          type: String,
        },
        details: {
          type: String,
        },
        taskType: {
          type: String,
        },
        coin: {
          type: String,
        },
        priority: {
          type: String,
        },
        status: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        subTask: [{ type: String }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//create project join request model
export const ProjectJoinRequest = model(
  "ProjectJoinRequest",
  ProjectJoinRequestSchema
);
