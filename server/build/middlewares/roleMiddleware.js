import ApiError from "../exceptions/apiError.js";
const roleMiddleware = (req, res, next) => {
    try {
        const roleHeader = req.headers.role;
        if (!roleHeader) {
            return next(ApiError.LackOfAccessRights('Not enough rights'));
        }
        if (roleHeader !== "HR-manager") {
            return next(ApiError.LackOfAccessRights('Not enough rights'));
        }
        next();
    }
    catch {
        return next(ApiError.LackOfAccessRights('Not enough rights'));
    }
};
export default roleMiddleware;
