// // src/app/modules/payment/paymentIntent.model.js
 //import { Schema, model } from "mongoose";

// const PaymentIntentSchema = new Schema({
//  amount: {
//     type: Number,
//     required: true,
//  },
//  currency: {
//     type: String,
//     required: true,
//  },
//  status: {
//     type: String,
//     enum: ['pending', 'succeeded', 'failed'],
//     default: 'pending',
//  },
// //  userId: {
// //     type: Schema.Types.ObjectId,
// //     ref: 'Member', // Assuming you have a User model
// //     required: true,
// //  },
//  // Add other necessary fields here
// }, {
//  timestamps: true,
// });

// export const PaymentIntent = model("PaymentIntent", PaymentIntentSchema);

// src/app/modules/payment/payment.model.js
import { Schema, model } from "mongoose";

const PaymentSchema = new Schema({
  clientSecret: {
     type: String,
     required: true,
  },
 });

export const Payment = model("Payment", PaymentSchema);
// models/PaymentIntent.js

//const mongoose = require('mongoose');

// const PaymentIntentSchema = new mongoose.Schema({
//   clientSecret: {
//     type: String,
//     required: true,
//   },
// });

// const PaymentIntent = mongoose.model('PaymentIntent', PaymentIntentSchema);

// module.exports = PaymentIntent;
