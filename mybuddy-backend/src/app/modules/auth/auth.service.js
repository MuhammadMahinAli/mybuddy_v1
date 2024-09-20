import httpStatus from "http-status";
import {ApiError} from "../../../handleError/apiError.js";
import {Member} from "../member/member.model.js";
import {createToken, verifyToken} from "../../../utils/token.js";
import config from "../../../config/index.js";


//----------user login

export const loginUserService = async (payload) => {
  const {email, password} = payload;
  // Creating instance of user
  const member = new Member();
  // Checking member existence
  const isMemberExist = await member.isMemberExist(email);


 // console.log("mrmber",isMemberExist);

  
  if (!isMemberExist) {
     throw new ApiError(httpStatus.NOT_FOUND, "Member doesn't found");
  }

  //console.log(isMemberExist);
    // -----Check if the email is verified
    if (!isMemberExist.emailVerified) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Email is not verified");
    }

    //console.log("new hash", isMemberExist.isPasswordMatched(password))
  //--------- Checking password match

  const isValid = await isMemberExist.isPasswordMatched(password);
 // console.log('Password validity:', isValid);
  
  if (!isValid) {
    console.log('Password is incorrect');
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create access token
  const {email: memberEmail, role, _id: memberId, emailVerified} = isMemberExist;
  const token = createToken({memberEmail, role, memberId, emailVerified}, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  });
  
  const refreshToken = createToken({memberEmail, role, memberId, emailVerified}, config.jwt.refresh_secret, {expiresIn: config.jwt.refresh_expires_in});
  
  return {
    accessToken: token,
    refreshToken,
    user: isMemberExist,
  };
}




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

//--------- update pass 

export const updatePasswordService = async (userId, newPassword) => {
 //console.log('Updating password for user:', userId);
  
  const user = await Member.findById(userId);

  if (!user) {
    console.log('User not found');
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  
  user.password = newPassword;
  await user.save();
  
 // console.log('Password updated successfully');

  // Generate new tokens after updating the password
  const { email: memberEmail, role, _id: memberId, emailVerified } = user;
  
  // Create new access token
  const token = createToken({ memberEmail, role, memberId, emailVerified }, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  });

  // Create new refresh token
  const refreshToken = createToken({ memberEmail, role, memberId, emailVerified }, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expires_in,
  });

  return {
    message: "Password updated successfully",
    accessToken: token,
    refreshToken,
  };
};
