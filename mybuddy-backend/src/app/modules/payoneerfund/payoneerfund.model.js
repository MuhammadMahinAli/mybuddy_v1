import { Schema, model } from "mongoose";

const PayoneerFundSchema = new Schema(
  {
  
    fundingProject: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    requestedTo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    transactionId: {
      type: String,
    },
    payponeerEmail: {
      type: String,
    },
    amount: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//create PayoneerFund model
export const PayoneerFund = model("PayoneerFund", PayoneerFundSchema);
