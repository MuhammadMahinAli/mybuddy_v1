import { model, Schema } from "mongoose";

const CommitSchema = new Schema(
  {
    commitBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    project: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    message: {
      type: String,
      required: true,
    },
    media: [
      {
        type: String,
      },
    ],
    externalLink: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Declined", "Approved"],
    },
    declineMessage: {
      type: String,
    },
    completedTask: {
      task: { type: String },
      subTask: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// ----- exporting commit model
export const Commit = model("Commit", CommitSchema);
