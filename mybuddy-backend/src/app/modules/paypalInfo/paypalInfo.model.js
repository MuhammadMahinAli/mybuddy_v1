import { Schema, model } from "mongoose";

const PaypalInfoSchema = new Schema(
  {
   paypalLink: {
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

//create PaypalInfo model
export const PaypalInfo = model("PaypalInfo", PaypalInfoSchema);
