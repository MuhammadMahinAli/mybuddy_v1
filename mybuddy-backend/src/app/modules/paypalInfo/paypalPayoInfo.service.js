import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { PaypalPayoInfo } from "./paypalPayoInfo.model.js";


// // ---------- create payment and store stripe
export const savePaypalInfoService = async (formData) => {
    try {
      const result = await PaypalPayoInfo.create(formData);
      if (!result) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to save paypalInfo."
        );
      }
      return result;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };
export const savePayoneerInfoService = async (formData) => {
    try {
      const result = await PaypalPayoInfo.create(formData);
      if (!result) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to save payoneerInfo."
        );
      }
      return result;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

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