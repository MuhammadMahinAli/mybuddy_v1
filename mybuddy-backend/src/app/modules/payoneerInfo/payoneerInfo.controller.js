import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { deletePayoneerLinkService, getPayoneerLinkService, savePayoneerInfoService, updatePayoneerLinkService } from "./payoneerInfo.service.js";




//------- save Paypal Info

// export const savePaypalInfoController = catchAsync(async (req, res, next) => {
//     const data = req.body;
//     const newPaymentInfo = await savePaypalInfoService(data);
  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Paypal Info service saved successfully!",
//       data: newPaymentInfo,
//     });
//   });


export const savePayoneerInfoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const newPaymentInfo = await savePayoneerInfoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payoneer Info service saved successfully!",
      data: newPaymentInfo,
    });
  });

  //------- get paypal link

 export const getPayoneerLinkController = catchAsync(async (req,res)=>{
  const getLink = await getPayoneerLinkService(req?.params?.id);

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Users Payoneer link retrived successfully",
    data:getLink
  })
 }) 


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
//           message: 'PayPal link updated successfully!',
//           data: updatedInfo,
//       });
//   } catch (error) {
//       res.status(500).json({ message: 'Error updating PayPal link', error: error.message });
//   }
// };
 //------- update paypal link

export const updatePayoneerLinkController = async (req, res) => {
  const { id } = req.params; // Retrieve id from the URL parameter
  const { newPayoneerLink } = req.body; // Retrieve the new PayPal link from the request body
  console.log(req.body);

  try {
      const updatedInfo = await updatePayoneerLinkService(id, newPayoneerLink);

      if (!updatedInfo) {
          return res.status(404).json({ message: 'Record not found or no update performed.' });
      }

      res.status(200).json({
          message: 'Payoneer link updated successfully!',
          data: updatedInfo,
      });
  } catch (error) {
      res.status(500).json({ message: 'Error updating Payoneer link', error: error.message });
  }
};

//-------- delete paypal 
export const deletePayoneerLinkController = catchAsync(async (req,res)=>{
  const id = req.params.id;

  const requests = await deletePayoneerLinkService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Paypal Link deleted successfully!",
    data: requests,
  });
})


