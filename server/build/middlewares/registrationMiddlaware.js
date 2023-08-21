import ApiError from "../exceptions/apiError.js";
const registrationMiddleware = (req, res, next) => {
    const { firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired } = req.body;
    if (!firstname || !lastname || !middlename || !dateOfBirthday || !role || !salaryAmount || !dateHired) {
        return next(ApiError.BadRequest('Введены не все данные'));
    }
    next();
};
export default registrationMiddleware;
