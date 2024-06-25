import { Schema, model } from "mongoose";

// Feed (Project) Schema
const ProjectFeedSchema = new Schema(
    {
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String, 
        required: true,
      },
      technicalRequirements: {
        type: [String],
        required: true,
      },
      team: [
        {
          name: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            required: true,
          },
        }
      ]
    },
    {
      timestamps: true,
    }
  );

  export const ProjectFeed = model("ProjectFeed", ProjectFeedSchema);