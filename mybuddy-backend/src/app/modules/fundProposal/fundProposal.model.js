import { Schema, model } from "mongoose";

const FundProposalSchema = new Schema(
  {
    projectName: {
      type: String,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    requestedTo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Declined", "Done"],
    },
    amount: {
      type: Number,
      required: true,
    },

  
  },
  {
    timestamps: true,
  }
);

//create FundProposal model
export const FundProposal = model("FundProposal", FundProposalSchema);
