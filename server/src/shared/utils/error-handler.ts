class CustomError extends Error {
  data: {status: number};

   constructor(message: string, data?: { status: number }) {
      super(message);
      this.data = data ?? { status: 500 };
   }
}


function handleError(e: any) {
  if(e instanceof CustomError) {
    return {
      status: e.data.status,
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