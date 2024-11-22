import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { PaypalFund } from "./paypalfund.model.js";


//  ---------- create payment and store stripe
export const savePaypalFundInfoService = async (formData) => {
    try {
      const result = await PaypalFund.create(formData);
      if (!result) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to save paypal fund Info."
        );
      }
      return result;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

   // get all

   export const getAllPaypalFundInfoService = async() => {
    const getAllPaypalFundInfo = await PaypalFund.find({})
    .populate("requestedBy")
    .sort({createdAt:-1});
    return getAllPaypalFundInfo;
  }

//--------- update status
export const updatePaypalFundStatusService = async (id, status) => {
  const updatedPaypalFundStatus = await PaypalFund.findById({
    _id: id,
  });

  if (!updatedPaypalFundStatus) {
    throw new ApiError(httpStatus.NOT_FOUND, "Paypal Fund not found");
  }
  updatedPaypalFundStatus.status = status;
  await updatedPaypalFundStatus.save();
  return updatedPaypalFundStatus;
};

//-------- get all by requested by

export const getPaypalFundByRequestedByService = async (id) => {
  const sentFundRequests = await PaypalFund.find({ requestedBy: id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return sentFundRequests;
};

//-------- get all by requested to

export const getPaypalFundByRequestedToService = async (id) => {
  const sentFundRequests = await PaypalFund.find({ requestedTo: id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return sentFundRequests;
};


//-------- get all by project id

export const getPaypalFundByProjectService = async (id) => {
  const fundRequests = await PaypalFund.find({ fundingProject : id })
  .populate("requestedBy")
  .populate("requestedTo")
  .sort(
    { createdAt: -1 }
  );
  return fundRequests;
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

export const deletePaypalFundService = async(id)=>{
  const result = await PaypalFund.findByIdAndDelete({_id:id});
  return result;
}

