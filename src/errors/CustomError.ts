export default class CustomError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
      super(message);
      this.status = status;
  
      // Only because we are extending a built in class
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }