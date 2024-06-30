import {Schema, model} from "mongoose";

const ArticleFeedSchema = new Schema(
  {
    articleID: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
     required: true,
    }
  },
  {
    timestamps: true,
  }
);



//create article model
export const ArticleFeed = model("ArticleFeed", ArticleFeedSchema);
