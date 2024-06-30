export const handleCastError = (err) => {
  const errors = [
    {
      path: err?.path,
      message: "Invalid Object id",
    },
  ];

  return {
    statusCode: 400,
    message: "Cast Error",
    errorMessages: errors,
  };
};
