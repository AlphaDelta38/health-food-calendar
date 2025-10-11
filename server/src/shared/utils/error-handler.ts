class CustomError extends Error {
  data: {status: number};

   constructor(message: string, data?: any) {
      super(message);
      this.data = data
   }
}


function handleError(e: any) {
  if(e instanceof CustomError) {
    return {
      status: e.data?.status ?? 500,
      message: e.message,
    };
  }else {
    return {
      status: 500,
      message: "Internal server error",
      error: e,
    };
  }
}

export {
  CustomError,
  handleError,
}