// this is a custom error class that extends the built-in Error class. It is used to create custom error objects. It is a better way to handle errors than the built-in Error class. Because when working with built-in error classs like Error object then in that case we have to create a new Error object for each error and then also set the status code and sometime we forgot to add that status code to the error object. This is not a good approach because it is not efficient and it is not a good way to handle errors. so we use this custom error class to create custom error objects. to use this custom error class, we need to import it and then use it to create a new error object like this: const error = new ApiError("Error message", statusCode, errors);
class ApiError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors; // this will give use the detailed error.
    this.success = false;
    //we use this because when we throw an error, the stack trace is not captured by the Error object so we need to capture the stack trace manually. The stack trace is used to debug the error.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
