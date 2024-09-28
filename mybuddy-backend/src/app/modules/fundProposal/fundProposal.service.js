import Stripe from "stripe";
import { FundProposal } from "./fundProposal.model.js";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createPaymentSession = async (paymentData) => {
//     const { requestedBy, requestedTo, projectId, amount } = paymentData;

//     try {
//       // Create Stripe Checkout Session
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 project: `Funding for project ${projectId}`,
//                 From: `Fund sent by ${requestedBy}`,
//                 To: `Fund for ${requestedTo}`,
//               },
//               unit_amount: amount * 100,
//             },
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`, // Stripe will replace this with actual session ID
//         cancel_url: `http://localhost:5173/funding-failed`,
//       });

//       // Save the funding proposal to the database
//       const fundProposal = await FundProposal.create({
//         requestedBy,
//         requestedTo,
//         projectId,
//         amount,
//       });

//       return { session, fundProposal };
//     } catch (error) {
//       console.error("Error creating payment session:", error);
//       throw new Error("Failed to create payment session");
//     }
//   };

//---------- 2nd

// fundProposal.service.js

export const createPaymentSessionService = async (paymentData) => {
  const { requestedBy, requestedTo, projectId, amount } = paymentData;

  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Funding for project ${projectId}`, // Product details
            },
            unit_amount: amount * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`, // Use session ID in the success URL
      cancel_url: `http://localhost:5173/funding-failed`,
      metadata: { requestedBy, requestedTo, projectId, amount }, // Include metadata for later use
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error("Error creating payment session:", error);
    throw error;
  }
};

// fundProposal.service.js

export const confirmPaymentService = async (sessionId) => {
  try {
    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      throw new Error("Payment was not successful");
    }

    const { requestedBy, requestedTo, projectId, amount } = session.metadata;

    // Save the funding proposal to the database after successful payment
    const fundProposal = await FundProposal.create({
      requestedBy,
      requestedTo,
      projectId,
      amount,
    });

    return { message: "Payment successful and proposal created", fundProposal };
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

//--------- get fundProposal by project Id

export const getAllFundRequestByProjectService = async (id) => {
  const fundRequests = await FundProposal.find({ projectId: id })
    .populate("requestedBy")
    .populate("requestedTo")
    .populate("projectId")
    .sort({ createdAt: -1 });
  return fundRequests;
};

//--------- get sent fundProposal [ requestedby ]

export const getAllFundRequestByRequestedByService = async (id) => {
  const sentFundRequests = await FundProposal.find({ requestedBy: id })
    .populate("requestedBy")
    .populate("requestedTo")
    .populate("projectId")
    .sort({ createdAt: -1 });
  return sentFundRequests;
};
