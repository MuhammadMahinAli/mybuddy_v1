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


// // ------ delete paypal

// export const deletePaypalLinkService = async(id)=>{
//   const result = await PaypalInfo.findByIdAndDelete({_id:id});
//   return result;
// }

