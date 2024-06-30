import  {Skill} from './skills.model.js';
import {ApiError} from "../../../handleError/apiError.js";
import httpStatus from "http-status";


// export const getSingleMemberSkill = async (id) => {
//    const skill = await Skill.findOne({_id: id}).populate('user');
//    return skill;
//  };
// skills.service.js

// export const getSingleMemberSkill = async (userId) => {
//   const skills = await Skill.find({ user: userId }).populate('user');
//   return skills;
// };




export const getSingleMemberSkillService = async (userId) => {
  try {
    const skills = await Skill.find({ user: userId }).populate('user');
    return skills;
  } catch (error) {
    throw new Error("Failed to fetch user's skills");
  }
};




// post skills.service.js

export const postSingleMemberSkillService = async(data) => {
  try {
     const result = await Skill.create(data);
     if (!result) {
       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create skill");
     }
     return result;
  } catch (error) {
     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
 };

 //---------update skill
 
 export const updateSingleMemberSkillService = async (userId, skillArray) => {
  const isExist = await Skill.findOne({ user: userId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const updatedSkill = await Skill.findOneAndUpdate(
    { user: userId },
    { skillArray: skillArray}, // Use $each to add multiple elements
    { new: true }
  );

  if (!updatedSkill) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Couldn't update skill array");
  }

  return updatedSkill;
};
 
