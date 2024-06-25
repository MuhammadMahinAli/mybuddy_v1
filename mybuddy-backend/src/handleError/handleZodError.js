export const handleZodError = (err) => {
  const errors = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessages: errors,
  };
};
