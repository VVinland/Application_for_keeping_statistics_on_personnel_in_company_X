import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/apiError.js";

const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleHeader = req.headers.role;
    
        if (!roleHeader) {
            return next(ApiError.LackOfAccessRights('Not enough rights'));
        }
     
        if(roleHeader !== "HR-manager"){
            return next(ApiError.LackOfAccessRights('Not enough rights'));
        }
        next();
    } catch {
        return next(ApiError.LackOfAccessRights('Not enough rights'));
    }
}

export default roleMiddleware;