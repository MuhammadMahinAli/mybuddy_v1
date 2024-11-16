import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { PayoneerFund } from "./payoneerfund.model.js";

//  ---------- create payment and store stripe
export const savePayoneerFundInfoService = async (formData) => {
    try {
      const result = await PayoneerFund.create(formData);
      if (!result) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to save payoneer fund Info."
        );
      }
      return result;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  // get all

    export const getAllPayoneerFundInfoService = async() => {
    const getAllPayoneerFundInfo = await PayoneerFund.find({})
    .sort({createdAt:-1});
    return getAllPayoneerFundInfo;
  }

  //--------- update status
export const updatePayoneerFundStatusService = async (id, status) => {
  const updatedPayoneerFundStatus = await PayoneerFund.findById({
    _id: id,
  });

  if (!updatedPayoneerFundStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, "Bank Transfer Fund not found");
  }
  updatedPayoneerFundStatus.status = status;
  await updatedPayoneerFundStatus.save();
  return updatedPayoneerFundStatus;
};

//--------- get recieve fundProposal [ requestedTo ]

export const getPayoneerFundByRequestedToService = async (id) => {
  const recieveFundRequests = await PayoneerFund.find({ requestedTo: id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return recieveFundRequests;
};
//--------- get fund by project

export const getPayoneerFundByProjectService = async (id) => {
  const recieveFundRequests = await PayoneerFund.find({ fundingProject : id })
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

export const deletePayoneerFundService = async(id)=>{
  const result = await PayoneerFund.findByIdAndDelete({_id:id});
  return result;
}

