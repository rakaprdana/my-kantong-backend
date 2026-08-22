export const toAPIResponse = <T>(
  code: number,
  success: boolean,
  message: string,
  data?: T,
) => {
  return {
    code: code,
    success: success,
    message: message,
    data: data,
  };
};
