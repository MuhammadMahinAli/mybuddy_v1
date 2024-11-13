import { Schema, model } from "mongoose";

const BankTransferFundSchema = new Schema(
  {
    projectName: {
      type: String,
    },
    accountName: {
      type: String,
    },

    bankAccountNumber: {
      type: String,
    },

    bankName: {
      type: String,
    },

    branchName: {
      type: String,
    },

    status: {
      type: String,
      required: true,
      enum: ["Pending", "Declined", "Done"],
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
    fundingProject: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    transactionId: {
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

//create BankTransferFund model
export const BankTransferFund = model(
  "BankTransferFund",
  BankTransferFundSchema
);
