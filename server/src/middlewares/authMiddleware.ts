import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/apiError.js"
import tokenService from "../services/token_service.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UserNotAuthorized());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UserNotAuthorized());
        }

        const employeeData = tokenService.validateAccessToken(accessToken);
        if (!employeeData) {
            return next(ApiError.UserNotAuthorized());
        }
        next();
    } catch (error) {
        return next(ApiError.UserNotAuthorized());
    }
}

export default authMiddleware;