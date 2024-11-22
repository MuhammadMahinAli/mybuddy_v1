import { Schema, model } from "mongoose";

const PayoneerFundSchema = new Schema(
  {
    projectName: {
      type: String,
    },
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
    requestedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    status: {
      type: String,
      required: true,
      enum: ["Pending", "Declined", "Done"],
    },

    transactionId: {
      type: String,
    },
    payoneerEmail: {
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
