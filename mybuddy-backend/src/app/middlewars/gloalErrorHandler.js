import {ZodError} from "zod";
import config from "../../config/index.js";

import {handleValidationError} from "../../handleError/handleValidationError.js";
import {handleDuplicateKeyError} from "../../handleError/handleDuplicateKeyError.js";
import {handleZodError} from "../../handleError/handleZodError.js";
import {handleCastError} from "../../handleError/handleCastError.js";
import {ApiError} from "../../handleError/apiError.js";

export const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 400;
  let message = "Something went wrong";
  let errorMessages = [];

  //decide which response to show according to error
  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateKeyError();
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message ? [{path: "", message: error?.message}] : [];
  } //
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message ? [{path: "", message: error?.message}] : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};
