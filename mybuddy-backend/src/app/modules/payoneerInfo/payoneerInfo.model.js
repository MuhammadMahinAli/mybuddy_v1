import { Schema, model } from "mongoose";

const PayoneerInfoSchema = new Schema(
  {
   payoneerLink: {
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

//create PayoneerInfo model
export const PayoneerInfo = model("PayoneerInfo", PayoneerInfoSchema);
