import { Schema, model } from "mongoose";

const FundProposalPaymentSchema = new Schema(
  {
   fundFor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "FundProposal",
    },
    returnFundBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Accepted", "Rejected"],
    },
    returnAmount: {
      type: Number,
      required: true,
    },

  
  },
  {
    timestamps: true,
  }
);

//create FundProposalPayment model
export const FundProposalPayment = model("FundProposalPayment", FundProposalPaymentSchema);
