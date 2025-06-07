const constants = {
  errorHandling: {
    INVALID_AUTH_CREDENTIALS: "Invalid authorization credentials",
    INVALID_MODEL_ID: (model: string) => `Invalid ${model} ID`,
    MODEL_NOT_FOUND: (model: string) => `${model} not found`,
  },
} as const;

export default constants;
