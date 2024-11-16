import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { deletePaypalFundService, getAllPaypalFundInfoService, getPaypalFundByProjectService, getPaypalFundByRequestedToService, savePaypalFundInfoService, updatePaypalFundStatusService } from "./paypalfundservice.js";




//------- save Paypal Info

export const savePaypalFundInfoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const newPaymentInfo = await savePaypalFundInfoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Paypal Info service saved successfully!",
      data: newPaymentInfo,
    });
  });

 //------- get all payoneer fund

 export const getAllPaypalFundInfoController = catchAsync(async (req,res)=>{
  const getAllPaypalFundInfo = await getAllPaypalFundInfoService();

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"All Paypal Fund Information retrived successfully",
    data:getAllPaypalFundInfo
  })
 }) 
   //--------- update status controller

export const updatePaypalFundStatusServiceController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedPaypal = await updatePaypalFundStatusService(id, status);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank Transfer Fund status updated successfully",
    data: updatedPaypal,
  });
});

// -------------  get recieve fundProposal [ requestedTo ]

export const getPaypalFundByRequestedToController = catchAsync(async (req, res) => {
  const {id} = req.params;
  const recieveFundRequest = await getPaypalFundByRequestedToService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success:true,
    message:"All recieve fund request is retrived successfully!",
    data: recieveFundRequest,
  });
});

// -------------  get recieve fundProposal [ requestedTo ]

export const getPaypalFundByProjectController = catchAsync(async (req, res) => {
  const {id} = req.params;
  const recieveFundRequest = await getPaypalFundByProjectService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success:true,
    message:"All recieve fund request of a project is retrived successfully!",
    data: recieveFundRequest,
  });
});


  //------- get paypal link

//  export const getPaypalLinkController = catchAsync(async (req,res)=>{
//   const getLink = await getPaypalLinkService(req?.params?.id);

//   sendResponse(res,{
//     statusCode:httpStatus.OK,
//     success:true,
//     message:"Users Paypal link retrived successfully",
//     data:getLink
//   })
//  }) 


//  //------- update paypal link

// export const updatePaypalLinkController = async (req, res) => {
//   const { id } = req.params; // Retrieve id from the URL parameter
//   const { newPaypalLink } = req.body; // Retrieve the new PayPal link from the request body
//   console.log(req.body);

//   try {
//       const updatedInfo = await updatePaypalLinkService(id, newPaypalLink);

//       if (!updatedInfo) {
//           return res.status(404).json({ message: 'Record not found or no update performed.' });
//       }

//       res.status(200).json({
//           message: 'PayPal link updated successfully!',
//           data: updatedInfo,
//       });
//   } catch (error) {
//       res.status(500).json({ message: 'Error updating PayPal link', error: error.message });
//   }
// };


//-------- delete paypal 
export const deletePaypalFundController = catchAsync(async (req,res)=>{
  const id = req.params.id;

  const requests = await deletePaypalFundService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Paypal fund deleted successfully!",
    data: requests,
  });
})


