






//import Stripe from "stripe";
//import { FundProposal } from "./fundProposalPayment.model.js";

// Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // ---------- create payment and store stripe
// export const createPaymentSessionService = async (paymentData) => {
//   const { requestedBy, requestedTo, projectId, amount, status } = paymentData;
//   //console.log("Paym", paymentData);
//   try {
//     // Create Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `Funding for project ${projectId}`, // Product details
//               description: `Sender ID: ${requestedBy}, Receiver ID: ${requestedTo}`, // Include sender and receiver in the description
//             },
//             unit_amount: amount * 100, // Stripe expects the amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `https://researchbdy.com/success?session_id={CHECKOUT_SESSION_ID}`, // Use session ID in the success URL
//       cancel_url: `https://researchbdy.com/funding-failed`,
//       metadata: { requestedBy, requestedTo, projectId, status, amount }, // Include metadata for later use
//     });

//     return { sessionId: session.id };
//   } catch (error) {
//     console.error("Error creating payment session:", error);
//     throw error;
//   }
// };

// export const confirmPaymentService = async (sessionId) => {
//   try {
//     // Retrieve session details from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (!session) {
//       throw new Error("Session not found");
//     }

//     // Check if payment was successful
//     if (session.payment_status !== "paid") {
//       throw new Error("Payment was not successful");
//     }

//     const { requestedBy, requestedTo, projectId, status, amount } =
//       session.metadata;
//     // console.log("session", session.metadata);

//     // Check for existing proposal to prevent duplicates
//     const existingProposal = await FundProposal.findOne({
//       requestedBy,
//       requestedTo,
//       projectId,
//       status,
//       amount,
//     });

//     if (existingProposal) {
//       throw new Error("Payment proposal already exists");
//     }

//     // Save the funding proposal to the database after successful payment
//     const fundProposal = await FundProposal.create({
//       requestedBy,
//       requestedTo,
//       projectId,
//       status,
//       amount,
//     });

//     return { message: "Payment successful and proposal created", fundProposal };
//   } catch (error) {
//     console.error("Error confirming payment:", error);
//     throw error;
//   }
// };

// //--------- get fundProposal by project Id

// export const getAllFundRequestByProjectService = async (id) => {
//   const fundRequests = await FundProposal.find({ projectId: id })
//     .populate("requestedBy")
//     .populate("requestedTo")
//     .populate("projectId")
//     .sort({ createdAt: -1 });
//   return fundRequests;
// };

// //--------- get sent fundProposal [ requestedby ]

// export const getAllFundRequestByRequestedByService = async (id) => {
//   const sentFundRequests = await FundProposal.find({ requestedBy: id })
//     .populate("requestedBy")
//     .populate("requestedTo")
//     .populate("projectId")
//     .sort({ createdAt: -1 });
//   return sentFundRequests;
// };
// //--------- get recieve fundProposal [ requestedTo ]

// export const getAllFundRequestByRequestedToService = async (id) => {
//   const recieveFundRequests = await FundProposal.find({ requestedTo: id })
//   .populate("requestedBy")
//   .populate("requestedTo")
//   .populate("projectId")
//   .sort(
//     { createdAt: -1 }
//   );
//   return recieveFundRequests;
// };

// //--------- delete fund request

// export const deleteFundRequestService = async(id)=>{
//   const result = await FundProposal.findByIdAndDelete({_id:id});
//   return result;
// }