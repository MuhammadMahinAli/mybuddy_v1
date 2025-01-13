import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { ConferenceLink } from "./conference.model.js";

//  ---------- create conferenceLink
export const saveConferenceLinkService = async (formData) => {
  console.log(formData);
  try {
    const result = await ConferenceLink.create(formData);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to save ConferenceLink."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//------- get ConferenceLink by user

export const getConferenceLinkService = async () => {
  const getLink = await ConferenceLink.findOne({});
  return getLink;
};

//------- update ConferenceLink
export const updateConferenceLinkService = async (id, newConferenceLink) => {
  try {
    const updatedInfo = await ConferenceLink.findByIdAndUpdate(
      id,
      { conferenceLink: newConferenceLink },
      { new: true }
    );
    return updatedInfo;
  } catch (error) {
    throw new Error("Error updating ConferenceLink: " + error.message);
  }
};

// ------ delete ConferenceLink

export const deleteConferenceLinkService = async (id) => {
  const result = await ConferenceLink.findByIdAndDelete({ _id: id });
  return result;
};
