import { Schema, model } from "mongoose";

const ConferenceLinkSchema = new Schema(
  {
   conferenceLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//create ConferenceLink model
export const ConferenceLink = model("ConferenceLink", ConferenceLinkSchema);
