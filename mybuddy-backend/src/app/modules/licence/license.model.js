import { Schema, model } from "mongoose";

const LicenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  title: {
    type: String,
  },
  organization: {
    type: String,
  },
  issueDate: {
    type: String,
  },
  credentialLink: {
    type: String,
  },
}, {
  timestamps: true,
});

export const License = model("License", LicenseSchema);