export default class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
