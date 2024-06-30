// src/app/modules/payment/paymentIntent.controller.js
import { createPaymentIntent, getAllPaymentService } from './paymentIntent.service.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import httpStatus from 'http-status';

export const createPaymentIntentController = async (req, res) => {
 try {
    const { amount } = req.body;
    const clientSecret = await createPaymentIntent(amount);
    res.json({ clientSecret });
 } catch (error) {
    console.error('Error creating PaymentIntent:', error.message);
    res.status(500).json({ error: 'Internal server error' });
 }
};

// In your payment.controller.js


// export const getPaymentStatus = async (req, res) => {
//   try {
//     // Retrieve the payment intent ID from request parameters
//     const paymentIntentId = req.query.paymentIntentId;
//     if (!paymentIntentId) {
//       throw new Error('Payment Intent ID is required');
//     }
    
//     // Fetch the payment intent from Stripe
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
//     // Extract and send the payment status
//     res.status(200).json({ status: paymentIntent.status });
//   } catch (error) {
//     console.error('Error fetching payment status:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// };


// export const createPaymentIntentController = catchAsync(async (req, res, next) => {
//    const data = req.body;
//    const newPost = await createPaymentIntent(data);
 
//    sendResponse(res, {
//      statusCode: httpStatus.OK,
//      success: true,
//      message: "Payment created successfully!",
//      data: newPost,
//    });
//  });

export const getAllPayment = catchAsync(async (req, res) => {
   const members = await getAllPaymentService();
 
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: "Members retrieved successfully!",
     data: members,
   });
 });

 // Add this function to paymentIntent.service.js

// export const getPaymentStatusService = async (paymentIntentId) => {
//    try {
//      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//      return paymentIntent.status;
//    } catch (error) {
//      console.error('Error fetching payment status:', error.message);
//      throw error;
//    }
//  };



 import { getPaymentStatusService } from './paymentIntent.service.js';

export const getPaymentStatus = async (req, res) => {
  try {
    const paymentIntentId = req.query.paymentIntentId;
    if (!paymentIntentId) {
      throw new Error('Payment Intent ID is required');
    }
    
    const status = await getPaymentStatusService(paymentIntentId);
    res.status(200).json({ status });
  } catch (error) {
    console.error('Error fetching payment status:', error.message);
    res.status(500).json({ error: error.message });
  }
};