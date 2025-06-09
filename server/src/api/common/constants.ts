const constants = {
  errorHandling: {
    INVALID_AUTH_CREDENTIALS: "Invalid authorization credentials",
    INVALID_MODEL_ID: (model: string) => `Invalid ${model} ID`,
    INVALID_QUERY_PARAM: (param: string) => `Invalid query param for ${param}`,
    INCLUDE_PARAM: (param: string) => `Please include parameter: ${param}`,
    MODEL_NOT_FOUND: (model: string) => `${model} not found`,
  },
} as const;

export default constants;
