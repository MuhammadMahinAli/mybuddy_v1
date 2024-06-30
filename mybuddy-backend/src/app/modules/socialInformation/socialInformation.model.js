import { Schema, model } from "mongoose";

const SocialInformationSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  instagram: {
    type: String,
  },
  personalWebsite: {
    type: String,
  },
  youtube: {
    type: String,
  },
  tiktok: {
    type: String,
  },
  pinterest: {
    type: String,
  },
  facebook: {
    type: String,
  },
}
,
{
  timestamps: true,
}
);

export const SocialInformation = model("SocialInformation", SocialInformationSchema);
