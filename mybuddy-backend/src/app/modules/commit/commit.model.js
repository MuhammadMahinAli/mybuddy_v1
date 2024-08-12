import { model, Schema } from "mongoose";

const CommitSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    project: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    task: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

// ----- eporting coommit model
export const Commit = model("Commit", CommitSchema);
