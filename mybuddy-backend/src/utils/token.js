import jwt from "jsonwebtoken";

//create new-token
export const createToken = (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};
//verify user token
export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
