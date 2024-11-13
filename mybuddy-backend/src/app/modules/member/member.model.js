import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config/index.js";

const MemberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      unique: true,
    },
    phoneNumberPrivacy: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      // required: true,
    },
    addressPrivacy: {
      type: Boolean,
      default: false,
    },

    country: {
      type: String,
      // required: true,
    },

    role: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    coverPic: {
      type: String,
    },

    about: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
//---------------- check user exist
MemberSchema.methods.isMemberExist = async function (email) {
  const user = await Member.findOne(
    { email },
    { _id: 1, email: 1, password: 1, role: 1,emailVerified:1,resetPasswordToken:1, resetPasswordExpires:1 }
  );
  return user;
};

//------------ pass match checking

MemberSchema.methods.isPasswordMatched = async function (givenPass) {
 // console.log("Stored password:", this.password);
 // console.log("given password:", givenPass);

  // Check if both givenPass and this.password are provided
  if (!givenPass || !this.password) {
    throw new Error(
      "Both given password and stored password are required for comparison"
    );
  }
  return await bcrypt.compare(givenPass, this.password);
};




//-------------- hasing password
MemberSchema.pre("save", async function (next) {
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});
//create user model
export const Member = model("Member", MemberSchema);
