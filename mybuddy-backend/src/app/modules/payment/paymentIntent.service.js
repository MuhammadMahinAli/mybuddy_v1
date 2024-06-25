// import { ApiError } from "../../../handleError/apiError.js";
// import httpStatus from "http-status";
// import { PaymentIntent } from "./paymentIntent.model.js";

// export const createPaymentIntentService = async(paymentData) => {
//    try {
//       const result = await PaymentIntent.create(paymentData);
//       console.log(result);
//       if (!result) {
//         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create payment");
//       }
//       return result;
//    } catch (error) {
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//    }
//   };
// src/app/modules/payment/payment.service.js
// import Stripe from 'stripe';
// import { Payment } from './payment.model.js';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createPaymentIntentService = async (amount, currency) => {
//  try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });

//     const payment = new Payment({
//       clientSecret: paymentIntent.client_secret,
//     });

//     await payment.save();

//     return payment;
//  } catch (error) {
//     console.error('Error creating payment intent:', error);
//     throw error;
//  }
// };
// services/paymentIntentService.js
// src/app/modules/payment/paymentIntent.service.js

import Stripe from 'stripe';
import { Payment } from './paymentIntent.model.js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//const stripe = new Stripe('pi_3PLyv4JzZa0chHCf1D546icK_secret_eptBnlO6GqunYGOFNGoCkzZHh');

export const createPaymentIntent = async (amount) => {
 try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      
    });

    const newPaymentIntent = new Payment({
      clientSecret: paymentIntent.client_secret,
    });
    await newPaymentIntent.save();

    return newPaymentIntent.clientSecret;
 } catch (error) {
    console.error('Error creating PaymentIntent:', error.message);
    throw new Error('Error creating PaymentIntent');
 }
};

// export const createPaymentIntent = async(paymentData) => {
//   try {
//      const result = await Payment.create(paymentData);
//      if (!result) {
//        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
//      }
//      return result;
//   } catch (error) {
//      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//   }
//  };

export const getAllPaymentService = async () => {
  const users = await Payment.find({})
  return users;
};

///////////////////////////////////////////////////////////////

export const getPaymentStatusService = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.status;
  } catch (error) {
    console.error('Error fetching payment status:', error.message);
    throw error;
  }
};