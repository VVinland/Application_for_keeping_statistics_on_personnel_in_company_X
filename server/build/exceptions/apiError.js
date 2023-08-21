class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UserNotAuthorized() {
        return new ApiError(401, "User is not authorized");
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static LackOfAccessRights(message) {
        return new ApiError(403, message);
    }
}
export default ApiError;
