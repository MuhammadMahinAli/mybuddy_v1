import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { UsersTools } from "./usersTools.model.js";

//  ---------- create payment and store stripe
export const saveUsersToolsService = async (formData) => {
  try {
    // Check if the member already exists in UsersTools
    const existingUserTools = await UsersTools.findOne({ member: formData.member });

    if (existingUserTools) {
      // Update the tools array for the existing member
      existingUserTools.tools = formData.tools;
      const updatedResult = await existingUserTools.save();

      if (!updatedResult) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update user tools."
        );
      }
      return updatedResult;
    } else {
      // Create a new UsersTools entry if the member doesn't exist
      const newResult = await UsersTools.create(formData);

      if (!newResult) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to save user tool."
        );
      }
      return newResult;
    }
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


//------------ get by member

export const getUsersToolByMemberService = async (id) => {
  const getUsersTools = await UsersTools.findOne({member:id}).populate("member").populate("tools.toolID").sort({
    createdAt: -1,
  });
  return getUsersTools;
};

// //--------- update status
// export const updateBankTransferFundStatusService = async (id, status) => {
//   const updatedBankTransferFundStatus = await BankTransferFund.findById({
//     _id: id,
//   });

//   if (!updatedBankTransferFundStatus) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Bank Transfer Fund not found");
//   }
//   updatedBankTransferFundStatus.status = status;
//   await updatedBankTransferFundStatus.save();
//   return updatedBankTransferFundStatus;
// };

// //--------- get recieve fundProposal [ requestedTo ]

// export const getAdminBankInfoService = async (id) => {
//   const bankInfo = await AdminBankInfo.findOne({ member : id })
//   .populate("member")
//   .sort(
//     { createdAt: -1 }
//   );
//   return bankInfo;
// };

// export const getBankFundByProjectService = async (id) => {
//   const recieveFundRequests = await BankTransferFund.find({ fundingProject: id })
//   .populate("requestedBy")
//   .populate("requestedTo")
//   .sort(
//     { createdAt: -1 }
//   );
//   return recieveFundRequests;
// };

// //------- get paypal link by user

// export const getPaypalLinkService = async(id) => {
//   const getLink = await PaypalInfo.findOne({member:id})
//   .populate("member")
//   .sort({createdAt:-1});
//   return getLink;
//}

// //------- update paypal link
// export const updateAdminBankInfoService = async (id, updatedBankData) => {
//   try {
//     const updatedInfo = await AdminBankInfo.findByIdAndUpdate(
//       id,
//       updatedBankData,
//       { new: true, } // Returns the updated document and validates input
//     );

//     return updatedInfo;
//   } catch (error) {
//     throw new Error("Error updating Admin Bank Info: " + error.message);
//   }
// };

// // ------ delete 

// export const deleteAdminBankInfoService = async(id)=>{
//   const result = await AdminBankInfo.findByIdAndDelete({_id:id});
//   return result;
// }
