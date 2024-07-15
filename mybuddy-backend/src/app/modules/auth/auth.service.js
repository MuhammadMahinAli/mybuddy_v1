import httpStatus from "http-status";
import {ApiError} from "../../../handleError/apiError.js";
import {Member} from "../member/member.model.js";
import {createToken, verifyToken} from "../../../utils/token.js";
import config from "../../../config/index.js";

//user login

export const loginUserService = async (payload) => {
  const {email, password} = payload;
  // Creating instance of user
  const member = new Member();
  // Checking member existence
  const isMemberExist = await member.isMemberExist(email);
  if (!isMemberExist) {
     throw new ApiError(httpStatus.NOT_FOUND, "Member doesn't found");
  }

    // Check if the email is verified
    if (!isMemberExist.emailVerified === false) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Email is not verified");
    }
  // Checking password match
  // Correctly call isPasswordMatched on the isMemberExist instance
  if (!await isMemberExist.isPasswordMatched(password)) {
     throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }
  // Create access token
  const {email: memberEmail, role, _id: memberId} = isMemberExist;
  const token = createToken({memberEmail, role, memberId}, config.jwt.secret, {
     expiresIn: config.jwt.expires_in,
  });
 
  const refreshToken = createToken({memberEmail, role, memberId}, config.jwt.refresh_secret, {expiresIn: config.jwt.refresh_expires_in});
 
  return {
     accessToken: token,
     refreshToken,
     user: isMemberExist,
  };
 };


///create refreshtoken
export const refreshTokenService = async (token) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }
  const {email} = verifiedToken;
  const member = new Member();
  const isMemberExist = await member.isMemberExist(email);
  if (!isMemberExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "member doesn't found");
  }
  const newAccessToken = createToken({email: isMemberExist.email, role: isMemberExist.role, memberId: isMemberExist._id}, config.jwt.secret, {expiresIn: config.jwt.expires_in});
  return {
    accessToken: newAccessToken,
  };
};
