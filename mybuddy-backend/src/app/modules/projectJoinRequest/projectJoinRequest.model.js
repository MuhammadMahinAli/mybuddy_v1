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
        budget:{
          type:String,
        }
        
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
