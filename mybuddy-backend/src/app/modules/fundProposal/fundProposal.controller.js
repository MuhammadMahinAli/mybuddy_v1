import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import {  confirmPaymentService, createPaymentSessionService, getAllFundRequestByProjectService, getAllFundRequestByRequestedByService } from "./fundProposal.service.js";

// export const createPaymentSessionController = async (req, res) => {
//   try {
//     const { requestedBy, requestedTo, projectId, amount } = req.body;
//     const result = await createPaymentSessionService({ requestedBy, requestedTo, projectId, amount });

//     return res.status(200).json({ sessionId: result.session.id, fundProposal: result.fundProposal });
//   } catch (error) {
//     console.error('Error in controller:', error);
//     return res.status(500).json({ error: error.message });
//   }
// };


// Controller for creating a Stripe payment session
// fundProposal.controller.js

export const createPaymentSessionController = async (req, res) => {
  const { requestedBy, requestedTo, projectId, amount } = req.body;

  try {
    const paymentSession = await createPaymentSessionService({
      requestedBy,
      requestedTo,
      projectId,
      amount,
    });

    res.status(200).json(paymentSession);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
};

// Controller for confirming payment and creating a fund proposal
// fundProposal.controller.js

export const confirmPaymentController = async (req, res) => {
  const { session_id } = req.query;

  try {
    if (!session_id) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Session ID is required',
        error: 'Session ID is required'
      });
    }

    const result = await confirmPaymentService(session_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment confirmed successfully",
      data: result
    });
  } catch (error) {
    console.error('Error in controller:', error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Failed to confirm payment',
      error: 'Failed to confirm payment'
    });
  }
};

//----- all fund request by project



export const getAllFundRequestByProjectController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const fundRequests = await getAllFundRequestByProjectService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All fund request by project is retrieved successfully!",
    data: fundRequests,
  });
});

//-------
export const getAllFundRequestByRequestedByController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const sentFundRequests = await getAllFundRequestByRequestedByService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All sent fund request is retrieved successfully!",
    data: sentFundRequests,
  });
});