import { Schema, model } from "mongoose";

const ToolsSchema = new Schema(
  {
    toolName: {
      type: String,
    },

    image: {
      type: String,
    },

    toolHomepage: {
      type: String,
    },

    description: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

//create Tools model
export const Tools = model("Tools", ToolsSchema);
