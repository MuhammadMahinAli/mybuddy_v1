import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { deletePayoneerFundService, getAllPayoneerFundInfoService, getPayoneerFundByRequestedToService, savePayoneerFundInfoService, updatePayoneerFundStatusService } from "./payoneerfundservice.js";




//------- save Payoneer Info

export const savePayoneerFundInfoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const newPaymentInfo = await savePayoneerFundInfoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payoneer Info service saved successfully!",
      data: newPaymentInfo,
    });
  });



  //------- get all payoneer fund

 export const getAllPayoneerFundInfoController = catchAsync(async (req,res)=>{
  const getAllPayoneerFundInfo = await getAllPayoneerFundInfoService();

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"All Payoneer Fund Information retrived successfully",
    data:getAllPayoneerFundInfo
  })
 }) 

   //--------- update status controller

export const updatePayoneerFundStatusServiceController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedPayoneerFund = await updatePayoneerFundStatusService(id, status);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payoneer Fund status updated successfully",
    data: updatedPayoneerFund,
  });
});

// -------------  get recieve fundProposal [ requestedTo ]

export const getPayoneerFundByRequestedToController = catchAsync(async (req, res) => {
  const {id} = req.params;
  const recieveFundRequest = await getPayoneerFundByRequestedToService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success:true,
    message:"All recieve fund request is retrived successfully!",
    data: recieveFundRequest,

  })
})


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
export const deletePayoneerFundController = catchAsync(async (req,res)=>{
  const id = req.params.id;

  const requests = await deletePayoneerFundService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Paypal Link deleted successfully!",
    data: requests,
  });
})


