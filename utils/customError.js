//custom error class to treat every error using it

class CustomError extends Error {
    constructor(msg, status) {
        super(msg);
        this.status = status;
    }
}

export default CustomError;