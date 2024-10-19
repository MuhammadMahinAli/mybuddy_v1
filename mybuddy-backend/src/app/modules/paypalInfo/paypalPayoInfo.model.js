import { Schema, model } from "mongoose";

const PaypalPayoInfoSchema = new Schema(
  {
   paypalLink: {
      type: String,
    },
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

//create PaypalPayoInfo model
export const PaypalPayoInfo = model("PaypalPayoInfo", PaypalPayoInfoSchema);
