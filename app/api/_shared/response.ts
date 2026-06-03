export const ok = (data: any) => {
  return {
    success: true,
    data,
  };
};

export const fail = (code: string, message: string, status = 400) => {
  return {
    success: false,
    error: {
      code,
      message,
    },
    status,
  };
};
