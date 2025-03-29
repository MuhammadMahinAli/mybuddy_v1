import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Member } from "./member.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../../../utils/emaillService.js";
import { sendPasswordResetEmail } from "../../../utils/forgetPassword.js";

// create user / signUp user
// export const createMemberService = async (userInfo) => {
//   const result = (await Member.create(userInfo)).toObject();
//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
//   }
//   const {password, ...newUser} = result;
//   return newUser;
// };

export const generateUniqueId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
};
console.log(generateUniqueId());
export const createMemberService = async (userInfo) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  userInfo.verificationToken = verificationToken;
  userInfo.uniqueId = generateUniqueId();

  //console.log("user", userInfo);
  const result = (await Member.create(userInfo)).toObject();
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  const { password, ...newUser } = result;
 // console.log("result", result);
 // console.log("userinfo", userInfo);

  const verificationUrl = `https://researchbdy.com/verified-email/${verificationToken}`;

  // Send verification email
  await sendEmail({
    to: newUser.email,
    subject: "Verify Your Email Address",
    html: `
     <div style="font-family: Arial, sans-serif;">
      <img src="https://i.ibb.co/g9fcnQq/logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
      <p style="padding-top: 10px;">Dear ${newUser.name.firstName} ${newUser.name.lastName},</p>
      <p>Thank you for signing up with us! We're excited to have you on board. To ensure the security and activation of your account, please verify your email address.</p>
      <p>To get started, click the link below:</p>
      <p><a className='font-semibold' href="${verificationUrl}">Verify Your Email</a></p>
      <p>If you did not sign up for this account, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The Research Buddy Team</p>
      </div>
    `,
  });

  return newUser;
};

//------------ verify email

export const verifyEmailService = async (token) => {
  const user = await Member.findOne({ verificationToken: token });
  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  await user.save();

  const userDetails = {
    firstName: user.name.firstName,
    lastName: user.name.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    uniqueId:user.uniqueId
  };

  return userDetails;
};

// ----------- resent email
export const resendEmailService = async (email) => {
  const member = await Member.findOne({ email });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  if (member.emailVerified === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already verified");
  }

  const verificationToken = member.verificationToken;

  //member.verificationToken = verificationToken;
  await member.save();

  const verificationLink = `https://researchbdy.com/verified-email/${verificationToken}`;
  await sendEmail({
    to: email,
    subject: "Verify Your Email Address",
    html: `
     <div style="font-family: Arial, sans-serif;">
      <img src="https://i.ibb.co/g9fcnQq/logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
      <p style="padding-top: 10px;">Dear ${member.name.firstName} ${member.name.lastName},</p>
      <p>Thank you for signing up with us! We're excited to have you on board. To ensure the security and activation of your account, please verify your email address.</p>
      <p>To get started, click the link below:</p>
      <p><a className='font-semibold' href="${verificationLink}">Verify Your Email</a></p>
      <p>If you did not sign up for this account, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The Research Buddy Team</p>
      </div>
    `,
  });

  return { message: "Verification email sent" };
};

///--------- get all users

// export const getAllMemberService = async () => {
//   const users = await Member.find({ email: { $ne: "researchbdy@gmail.com" } }); // Exclude "researchbdy@gmail.com"
//   return users;
// };
// export const getAllMemberService = async (filter, page = 1) => {
//   const pageSize = 10; // 10 members per page
//   const skip = (page - 1) * pageSize;

//   const query = {
//     email: { $ne: "researchbdy@gmail.com" }, // Exclude "researchbdy@gmail.com"
//     ...filter, // Add dynamic filtering based on the request
//   };

//   const members = await Member.find(query)
//     .skip(skip)
//     .limit(pageSize);

//   const totalMembers = await Member.countDocuments(query);

//   return {
//     members,
//     totalMembers,
//     totalPages: Math.ceil(totalMembers / pageSize),
//     currentPage: page,
//   };
// };



export const getAllMemberService = async (filter, page = 1) => {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const query = {
    email: { $ne: "researchbdy@gmail.com" },
    ...filter,
  };

  const members = await Member.find(query)
    .skip(skip)
    .limit(pageSize)
    .lean(); // Optional for better performance if you don’t need full Mongoose documents

  const totalMembers = await Member.countDocuments(query);
  const totalPages = Math.ceil(totalMembers / pageSize);

  return {
    members,
    totalMembers,
    totalPages,
    currentPage: page,
  };
};



export const getSingleMember = async (id) => {
  const user = await Member.findOne({ _id: id });
  return user;
};

//----------Update user
export const updateMemberService = async (id, updateData) => {
  const updatedMember = await Member.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedMember) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return updatedMember;
};

//------------- update profile pic

export const updateMemberProfilePicService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: { profilePic: data.profilePic } },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update profile pic"
      );
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//--------------- update cover pic 
export const updateMemberCoverPicService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: { coverPic: data.coverPic } },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update cover pic");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//--------------- update user info

export const updateMemberInfoService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }

    const updatedData = {
      name: {
        firstName: data.name.firstName,
        lastName: data.name.lastName,
      },
      role: data.role,
      about: data.about,
      phoneNumber: data.phoneNumber,
      phoneNumberPrivacy: data.phoneNumberPrivacy,
      address: data.address,
      addressPrivacy: data.addressPrivacy,
      country: data.country,
    };

    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update user information"
      );
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// -------- send reset password email

export const sendForgetPasswordEmailService = async (email) => {
  const user = await Member.findOne({ email });
  if (!user) {
    throw new Error("Member not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();

  const timeRemaining = resetPasswordExpires - Date.now();

  console.log(user?._id, resetToken, timeRemaining);

  // Create the reset URL with token
  const resetUrl = `https://researchbdy.com/reset-password?id=${user._id}&token=${resetToken}&timeRemaining=${timeRemaining}`;

  // Send email using utility function
  await sendPasswordResetEmail(user.email, user, resetUrl);

  return {
    message: "Password reset email sent successfully. Please check your inbox.",
    timeRemaining,
  };
};

//--------------  resetting the password

export const resetPasswordService = async (id, token, newPassword) => {
  const user = await Member.findOne({
    _id: id,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  console.log("user 377", user);
  if (!user) {
    throw new Error(
      "Invalid or expired reset token. Please generate a new one."
    );
  }
  // Hash the new password before saving
  //user.password = await bcrypt.hash(newPassword, 10);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log('Hashed password:', hashedPassword);
  
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  console.log('Password updated successfully');
  return { message: "Password has been reset successfully." };
};

// // Modified service function to get members with pagination and uniqueId filter
export const getAllMemberByFilterService = async (page, limit, uniqueId) => {
  const skip = (page - 1) * limit;

  // If uniqueId is provided, search for that specific project/member
  if (uniqueId) {
    const user = await Member.findOne({ uniqueId });
    if (!user) {
      return { message: "No project matched with the provided uniqueId." };
    }
    return { users: [user], totalPages: 1, currentPage: page };
  } 

  // If no uniqueId, fetch paginated results
  const users = await Member.find().skip(skip).limit(limit);
  const totalUsers = await Member.countDocuments();

  return {
    users,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  };
};


