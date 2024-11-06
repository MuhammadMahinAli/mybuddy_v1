import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { deletePaypalLinkService, getPaypalLinkService, savePaypalInfoService, updatePaypalLinkService } from "./paypalInfo.service.js";




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


// export const savePayoneerInfoController = catchAsync(async (req, res, next) => {
//     const data = req.body;
//     const newPaymentInfo = await savePayoneerInfoService(data);
  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Paypal Info service saved successfully!",
//       data: newPaymentInfo,
//     });
//   });

  //------- get paypal link

 export const getPaypalLinkController = catchAsync(async (req,res)=>{
  const getLink = await getPaypalLinkService(req?.params?.id);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Users Paypal link retrived successfully",
    data:getLink
  })
 }) 


 //------- update paypal link

export const updatePaypalLinkController = async (req, res) => {
  const { id } = req.params; // Retrieve id from the URL parameter
  const { newPaypalLink } = req.body; // Retrieve the new PayPal link from the request body
  console.log(req.body);

  try {
      const updatedInfo = await updatePaypalLinkService(id, newPaypalLink);

      if (!updatedInfo) {
          return res.status(404).json({ message: 'Record not found or no update performed.' });
      }

      res.status(200).json({
          message: 'PayPal link updated successfully!',
          data: updatedInfo,
      });
  } catch (error) {
      res.status(500).json({ message: 'Error updating PayPal link', error: error.message });
  }
};
 //------- update paypal link

// export const updatePayoneerLinkController = async (req, res) => {
//   const { id } = req.params; // Retrieve id from the URL parameter
//   const { newPayoneerLink } = req.body; // Retrieve the new PayPal link from the request body
//   console.log(req.body);

//   try {
//       const updatedInfo = await updatePayoneerLinkService(id, newPayoneerLink);

//       if (!updatedInfo) {
//           return res.status(404).json({ message: 'Record not found or no update performed.' });
//       }

//       res.status(200).json({
//           message: 'Payoneer link updated successfully!',
//           data: updatedInfo,
//       });
//   } catch (error) {
//       res.status(500).json({ message: 'Error updating Payoneer link', error: error.message });
//   }
// };

//-------- delete paypal 
export const deletePaypalLinkController = catchAsync(async (req,res)=>{
  const id = req.params.id;

  const requests = await deletePaypalLinkService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Paypal Link deleted successfully!",
    data: requests,
  });
})


