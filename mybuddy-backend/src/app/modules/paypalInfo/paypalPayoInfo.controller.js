import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { savePayoneerInfoService, savePaypalInfoService } from "./paypalPayoInfo.service.js";




//------- save Paypal Info

export const savePaypalInfoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const newPaymentInfo = await savePaypalInfoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Paypal Info service saved successfully!",
      data: newPaymentInfo,
    });
  });


export const savePayoneerInfoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const newPaymentInfo = await savePayoneerInfoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Paypal Info service saved successfully!",
      data: newPaymentInfo,
    });
  });

// //---------- save payment info in database


// export const confirmPaymentController = async (req, res) => {
//   const { session_id } = req.query;

//   try {
//     if (!session_id) {
//       return sendResponse(res, {
//         statusCode: httpStatus.BAD_REQUEST,
//         success: false,
//         message: 'Session ID is required',
//         error: 'Session ID is required'
//       });
//     }

//     const result = await confirmPaymentService(session_id);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Payment confirmed successfully",
//       data: result
//     });
//   } catch (error) {
//     console.error('Error in controller:', error);
//     sendResponse(res, {
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: 'Failed to confirm payment',
//       error: 'Failed to confirm payment'
//     });
//   }
// };

// //----- all fund request by project

// export const getAllFundRequestByProjectController = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const fundRequests = await getAllFundRequestByProjectService(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "All fund request by project is retrieved successfully!",
//     data: fundRequests,
//   });
// });

// //------- get sent fundProposal [ requestedby ] 

// export const getAllFundRequestByRequestedByController = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const sentFundRequests = await getAllFundRequestByRequestedByService(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "All sent fund request is retrieved successfully!",
//     data: sentFundRequests,
//   });
// });


// // -------------  get recieve fundProposal [ requestedTo ]

// export const getAllFundRequestByRequestedToController = catchAsync(async (req, res) => {
//   const {id} = req.params;
//   const recieveFundRequest = await getAllFundRequestByRequestedToService(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success:true,
//     message:"All recieve fund request is retrived successfully!",
//     data: recieveFundRequest,

//   })
// })

// //-------- delete fund request

// export const deleteFundRequestController = catchAsync(async (req,res)=>{
//   const id = req.params.id;

//   const requests = await deleteFundRequestService(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Fund request deleted successfully!",
//     data: requests,
//   });
// })