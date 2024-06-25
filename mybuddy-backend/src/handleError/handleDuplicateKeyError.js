export const handleDuplicateKeyError = () => {
  const errors = [
    {
      path: "",
      message: "Duplicate Field Value Entered",
    },
  ];

  return {
    statusCode: 400,
    message: "Duplicate key Error",
    errorMessages: errors,
  };
};
