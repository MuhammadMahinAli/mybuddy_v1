import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { BankTransferFund } from "./bankTransferfund.model.js";

//  ---------- create payment and store stripe
export const saveBankTransferFundInfoService = async (formData) => {
  try {
    const result = await BankTransferFund.create(formData);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to save bank transfer fund Info."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//------------ get all

export const getAllBankTransferFundInfoService = async () => {
  const getAllBankTransferFundInfo = await BankTransferFund.find({}).sort({
    createdAt: -1,
  });
  return getAllBankTransferFundInfo;
};

//--------- update status
export const updateBankTransferFundStatusService = async (id, status) => {
  const updatedBankTransferFundStatus = await BankTransferFund.findById({
    _id: id,
  });

  if (!updatedBankTransferFundStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, "Bank Transfer Fund not found");
  }
  updatedBankTransferFundStatus.status = status;
  await updatedBankTransferFundStatus.save();
  return updatedBankTransferFundStatus;
};

//--------- get recieve fundProposal [ requestedTo ]

export const getBankFundByRequestedToService = async (id) => {
  const recieveFundRequests = await BankTransferFund.find({ requestedTo: id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return recieveFundRequests;
};

//--------- get recieve fundProposal [ requestedTo ]

export const getBankFundByRequestedByService = async (id) => {
  const recieveFundRequests = await BankTransferFund.find({ requestedBy: id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return recieveFundRequests;
};

export const getBankFundByProjectService = async (id) => {
  const recieveFundRequests = await BankTransferFund.find({ fundingProject: id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return recieveFundRequests;
};

// //------- get paypal link by user

// export const getPaypalLinkService = async(id) => {
//   const getLink = await PaypalInfo.findOne({member:id})
//   .populate("member")
//   .sort({createdAt:-1});
//   return getLink;
//}

// //------- update paypal link
// export const updatePaypalLinkService = async (id, newPaypalLink) => {
//   try {
//     const updatedInfo = await PaypalInfo.findByIdAndUpdate(
//       id,
//       { paypalLink: newPaypalLink },
//       { new: true }
//     );
//     return updatedInfo;
//   } catch (error) {
//     throw new Error('Error updating PayPal link: ' + error.message);
//   }
// }

// ------ delete paypal

export const deleteBankFundService = async(id)=>{
  const result = await BankTransferFund.findByIdAndDelete({_id:id});
  return result;
}
