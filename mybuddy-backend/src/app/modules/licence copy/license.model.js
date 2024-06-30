import { Schema, model } from "mongoose";

const LicenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  title: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  credentialLink: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const License = model("License", LicenseSchema);