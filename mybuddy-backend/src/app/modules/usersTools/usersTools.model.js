import { Schema, model } from "mongoose";

const UsersToolsSchema = new Schema(
  {
    tools: [
      {
        toolID: {
          type: Schema.Types.ObjectId,
          ref: "Tools",
          required: true,
        },
      },
    ],
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create UsersTools model
export const UsersTools = model("UsersTools", UsersToolsSchema);
