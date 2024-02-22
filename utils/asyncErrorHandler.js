// Async Error Handler 

export const catchAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch((err) => {
    //   console.log("catch async error--> "+err);
    next(err);
  });
};