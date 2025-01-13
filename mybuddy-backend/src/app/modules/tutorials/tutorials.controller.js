import { catchAsync } from "../../../utils/catchAsync.js";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { deleteTutorialService, getTutorialsService, saveTutorialsService } from "./tutorials.service.js";


//------- save conferenceLink

export const saveTutorialsController = catchAsync(async (req, res, next) => {
  try {
    const data = req.body; // Expecting { field, displayText, tutorialUrl }
    const updatedTutorials = await saveTutorialsService(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tutorial saved successfully!",
      data: updatedTutorials,
    });
  } catch (error) {
    next(error);
  }
});


//------- delete


export const deleteTutorialController = catchAsync(async (req, res, next) => {
  try {
    const { field, tutorialUrl } = req.body;

    // Validate input
    if (!field || !tutorialUrl) {
      return res.status(400).json({ message: "Field and tutorialUrl are required." });
    }

    const updatedTutorials = await deleteTutorialService(field, tutorialUrl);

    res.status(200).json({
      success: true,
      message: "Tutorial deleted successfully.",
      data: updatedTutorials,
    });
  } catch (error) {
    next(error);
  }
});


//------- get conferenceLink

 export const getTutorialsController = catchAsync(async (req, res) => {
   const getLink = await getTutorialsService();

   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: "Conference Link retrived successfully",
     data: getLink,
   });
 });


// export const saveToolTutorialsController = catchAsync(
//   async (req, res, next) => {
//     const data = req.body;
//     console.log(data);
//     const newPaymentInfo = await saveToolTutorialsService(data);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Tool Tutorials service saved successfully!",
//       data: newPaymentInfo,
//     });
//   }
// );



//------- update conferenceLink

// export const updateConferenceLinkController = async (req, res) => {
//   const { id } = req.params;
//   const { newConferenceLink } = req.body;

//   try {
//     const updatedInfo = await updateConferenceLinkService(
//       id,
//       newConferenceLink
//     );

//     if (!updatedInfo) {
//       return res
//         .status(404)
//         .json({ message: "Record not found or no update performed." });
//     }

//     res.status(200).json({
//       message: "Conference Link updated successfully!",
//       data: updatedInfo,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         message: "Error updating Conference Link",
//         error: error.message,
//       });
//   }
// };

//-------- delete conferenceLink

// export const deleteConferenceLinkController = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const requests = await deleteConferenceLinkService(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Conference Link deleted successfully!",
//     data: requests,
//   });
// });
