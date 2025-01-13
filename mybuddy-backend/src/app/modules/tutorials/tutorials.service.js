import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Tutorials } from "./tutorials.model.js";



export const saveTutorialsService = async (formData) => {
  try {
    const { field, displayText, tutorialUrl } = formData;

    // Validate input
    if (!field || !displayText || !tutorialUrl) {
      throw new Error("Field, displayText, and tutorialUrl are required.");
    }

    const allowedFields = [
      "tools",
      "profile",
      "feeds",
      "researchers",
      "projects",
      "funds",
      "meetings",
      "appearance",
    ];

    if (!allowedFields.includes(field)) {
      throw new Error("Invalid field provided.");
    }

    // Push the object to the selected field
    const updatedTutorial = await Tutorials.findOneAndUpdate(
      {},
      { $push: { [field]: { displayText, tutorialUrl } } },
      { new: true, upsert: true }
    );

    return updatedTutorial;
  } catch (error) {
    throw new Error(error.message);
  }
};

//-------- delete
export const deleteTutorialService = async (field, tutorialUrl) => {
  try {
    const allowedFields = [
      "tools",
      "profile",
      "feeds",
      "researchers",
      "projects",
      "funds",
      "meetings",
      "appearance",
    ];

    if (!allowedFields.includes(field)) {
      throw new Error("Invalid field provided.");
    }

    const updatedTutorials = await Tutorials.findOneAndUpdate(
      {}, // Use an empty query to find the first document
      { $pull: { [field]: { tutorialUrl } } }, // Dynamically pull the object from the array
      { new: true } // Return the updated document
    );

    if (!updatedTutorials) {
      throw new Error("Tutorial not found.");
    }

    return updatedTutorials;
  } catch (error) {
    throw new Error(error.message);
  }
};

//------- get Tutorials by user

 export const getTutorialsService = async () => {
   const getLinks = await Tutorials.findOne({}).sort({ createdAt: -1 });
   return getLinks;
 };


//  ---------- create conferenceLink
// export const saveToolTutorialsService = async (formData) => {
//   console.log(formData);
//   try {
//     const result = await Tutorials.create(formData);
//     if (!result) {
//       throw new ApiError(
//         httpStatus.INTERNAL_SERVER_ERROR,
//         "Failed to save Tutorials."
//       );
//     }
//     return result;
//   } catch (error) {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//   }
// };

//------- get Tutorials by user

// export const getTutorialsService = async () => {
//   const getLink = await Tutorials.findOne({}).sort({ createdAt: -1 });
//   return getLink;
// };

//------- update Tutorials
// export const updateTutorialsService = async (id, newTutorials) => {
//   try {
//     const updatedInfo = await Tutorials.findByIdAndUpdate(
//       id,
//       { conferenceLink: newTutorials },
//       { new: true }
//     );
//     return updatedInfo;
//   } catch (error) {
//     throw new Error("Error updating Tutorials: " + error.message);
//   }
// };

// ------ delete Tutorials

// export const deleteTutorialsService = async (id) => {
//   const result = await Tutorials.findByIdAndDelete({ _id: id });
//   return result;
// };
