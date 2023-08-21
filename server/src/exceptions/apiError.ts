

class ApiError extends Error {
    status: number;
    errors: Error[];

    constructor(status: number, message: string, errors: Error[] = []) {
        super(message);

        this.status = status;
        this.errors = errors
    }

    static UserNotAuthorized() {
        return new ApiError(401, "User is not authorized");
    }

    static BadRequest(message: string, errors: Error[] = []) {
        return new ApiError(400, message, errors);
    }

    static LackOfAccessRights(message: string) {
        return new ApiError(403, message);
    }
}

export default ApiError;