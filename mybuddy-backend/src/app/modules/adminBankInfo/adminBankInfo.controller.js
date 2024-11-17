import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { deleteAdminBankInfoService, getAdminBankInfoService, saveAdminBankInfoService, updateAdminBankInfoService } from "./adminBankInfo.service.js";




//------- save Payoneer Info

export const saveAdminBankInfoController = catchAsync(async (req, res, next) => {
    const data = req.body;
    const newPaymentInfo = await saveAdminBankInfoService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bank Transfer Fund Info service saved successfully!",
      data: newPaymentInfo,

    });
  });

  //------- get all payoneer fund

//   export const getAllBankTransferFundInfoController = catchAsync(async (req,res)=>{
//     const getAllBankTransferFundInfo = await getAllBankTransferFundInfoService();
  
//     sendResponse(res,{
//       statusCode:httpStatus.OK,
//       success:true,
//       message:"All Bank Transfer Fund Information retrived successfully",
//       data:getAllBankTransferFundInfo
//     })
//    }) 
  

//    //--------- update status controller

// export const updateBankTransferFundStatusServiceController = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const updatedBankTransferFund = await updateBankTransferFundStatusService(id, status);
  
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Bank Transfer Fund status updated successfully",
//     data: updatedBankTransferFund,
//   });
// });

// // -------------  get recieve fundProposal [ requestedTo ]

export const getAdminBankInfoController = catchAsync(async (req, res) => {
  const {id} = req.params;
  const adminBankInfo = await getAdminBankInfoService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success:true,
    message:"Admin Bank Info is retrived successfully!",
    data: adminBankInfo,

  })
})

// // -------------  get recieve fundProposal [ requestedTo ]

// export const getBankFundByProjectController = catchAsync(async (req, res) => {
//   const {id} = req.params;
//   const recieveFundRequest = await getBankFundByProjectService(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success:true,
//     message:"All fund request of a project is retrived successfully!",
//     data: recieveFundRequest,

//   })
// })


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

export const updateAdminBankInfoController = async (req, res) => {
  const { id } = req.params; // Retrieve id from the URL parameter
  const updatedBankData = req.body; // Retrieve updated fields from the request body

  try {
    const updatedInfo = await updateAdminBankInfoService(id, updatedBankData);

    if (!updatedInfo) {
      return res
        .status(404)
        .json({ message: "Record not found or no update performed." });
    }

    res.status(200).json({
      message: "Admin Bank Info updated successfully!",
      data: updatedInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating Admin Bank Info",
      error: error.message,
    });
  }
};



//-------- delete  
export const deleteAdminBankInfoController = catchAsync(async (req,res)=>{
  const id = req.params.id;

  const requests = await deleteAdminBankInfoService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank info is deleted successfully!",
    data: requests,
  });
})


