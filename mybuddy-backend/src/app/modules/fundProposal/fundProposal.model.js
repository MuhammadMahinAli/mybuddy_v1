import { Schema, model } from "mongoose";

const FundProposalSchema = new Schema(
  {
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

    amount: {
      type: String,
      required: true,
    },

  
  },
  {
    timestamps: true,
  }
);

//create FundProposal model
export const FundProposal = model("FundProposal", FundProposalSchema);
