import {getSingleMemberSkillService, postSingleMemberSkillService, updateSingleMemberSkillService} from "./skills.service.js";
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import httpStatus from "http-status";


//------ get single member skill
// export const getSingleMemberSkillById = catchAsync(async (req, res) => {
//   try {
//     const id = req.params.id;
//     const skills = await getSingleMemberSkill(id);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Skills retrieved successfully!",
//       data: skills,
//     });
//   } catch (error) {
//     console.error("Error fetching skills:", error);
//     sendResponse(res, {
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       success: false,
//       message: "Failed to retrieve skills.",
//       meta: error.message,
//     });
//   }
// });



export const getSingleMemberSkillById = async (req, res) => {
  const userId = req.params.id;


    const skills = await getSingleMemberSkillService(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Skill!",
      data: skills,
    });
};


//---------- post skill

export const postSingleMemberSkillController= catchAsync(async (req, res, next) => {
  const data = req.body;
  const newPost = await postSingleMemberSkillService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post created successfully!",
    data: newPost,
  });
});

//-------update skill of specific user
// export const updateUser = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const updatedData = req?.body;
//   const updatedUser = await updateUserService(id, updatedData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User updated successfully!",
//     data: updatedUser,
//   });
// });

export const updateSingleMemberSkillController = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { skillArray } = req.body; // Assuming skillArray is sent in the body as an array
 // const session = req.session; // Assuming session is managed and passed in req object

  try {
    const updatedSkill = await updateSingleMemberSkillService(userId, skillArray);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Skills updated successfully!",
      data: updatedSkill,
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Failed to update skills.",
      meta: error.message,
    });
  }
});