import { Schema, model } from "mongoose";

const AdminBankInfoSchema = new Schema(
  {
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

    member: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
  },
  {
    timestamps: true,
  }
);

//create AdminBankInfo model
export const AdminBankInfo = model("AdminBankInfo", AdminBankInfoSchema);
