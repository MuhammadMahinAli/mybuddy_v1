import { Schema, model } from "mongoose";

// Feed (Media) Schema
const MediaFeedSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: true,
    }
  },
  {
    timestamps: true,
  }
);



// Create models
export const MediaFeed = model("MediaFeed", MediaFeedSchema);

