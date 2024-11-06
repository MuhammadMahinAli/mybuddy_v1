import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { PaypalInfo } from "./paypalInfo.model.js";


//  ---------- create payment and store stripe
export const savePaypalInfoService = async (formData) => {
    try {
      const result = await PaypalInfo.create(formData);
      if (!result) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to save paypalInfo."
        );
      }
      return result;
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };


  //------- get paypal link by user

  export const getPaypalLinkService = async(id) => {
    const getLink = await PaypalInfo.findOne({member:id})
    .populate("member")
    .sort({createdAt:-1});
    return getLink;
  }

//------- update paypal link
export const updatePaypalLinkService = async (id, newPaypalLink) => {
  try {
    const updatedInfo = await PaypalInfo.findByIdAndUpdate(
      id,
      { paypalLink: newPaypalLink },
      { new: true }
    );
    return updatedInfo;
  } catch (error) {
    throw new Error('Error updating PayPal link: ' + error.message);
  }
}


// ------ delete paypal

export const deletePaypalLinkService = async(id)=>{
  const result = await PaypalInfo.findByIdAndDelete({_id:id});
  return result;
}

// export const savePayoneerInfoService = async (formData) => {
//     try {
//       const result = await PaypalInfo.create(formData);
//       if (!result) {
//         throw new ApiError(
//           httpStatus.INTERNAL_SERVER_ERROR,
//           "Failed to save payoneerInfo."
//         );
//       }
//       return result;
//     } catch (error) {
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//     }
//   };

//------- update Payoneer link
// export const updatePayoneerLinkService = async (id, newPayoneerLink) => {
//   try {
//     const updatedInfo = await PaypalInfo.findByIdAndUpdate(
//       id,
//       { payoneerLink: newPayoneerLink },
//       { new: true }
//     );
//     return updatedInfo;
//   } catch (error) {
//     throw new Error('Error updating Payoneer link: ' + error.message);
//   }
// }