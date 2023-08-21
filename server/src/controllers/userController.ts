import { NextFunction, Request, Response } from "express";
import userService from "../services/user_service.js";
import { validationResult } from "express-validator/src/validation-result.js";
import ApiError from "../exceptions/apiError.js";



class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired } = req.body;

            const link_registering = await userService.registration(firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired);

            return res.json({ link_registering });
        } catch (error) {
            console.log(error);
        }
    }

    async lastStepOfRegisteringEmployee(req: Request, res: Response, next: NextFunction) {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errArray = errors.array() as unknown as Error[];
                return next(ApiError.BadRequest('Invalid email or password', errArray));
            }

            const { email, password, link_registering } = req.body;

            const employeeData = await userService.lastStepOfRegisteringEmployee(email, password, link_registering);
            res.cookie('refreshToken', employeeData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(employeeData);
        } catch (error) {
            next(error);
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const employeeData = await userService.login(email, password);
            res.cookie('refreshToken', employeeData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(employeeData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            await userService.logout(id);
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: 'Удаление прошло успешно' });
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {

        try {
            const { refreshToken } = req.cookies;

            const employeeData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', employeeData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(employeeData);
        } catch (error) {
            next(error);
        }

    }

    async getNumberHired(req: Request, res: Response, next: NextFunction) {
        try {
            const value = req.params.value;
            const countHiredOfEmployees = await userService.getNumberHiredEmployees(value);
            return res.json({ count: countHiredOfEmployees });
        } catch (error) {
            next(error);
        }
    }

    async getNumberDismissed(req: Request, res: Response, next: NextFunction) {
        try {
            const value = req.params.value;
            const countFiredOfEmployees = await userService.getNumberFiredEmployees(value);
            return res.json({ count: countFiredOfEmployees });
        } catch (error) {
            next(error);
        }
    }

    async getSalaryPayments(req: Request, res: Response, next: NextFunction) {
        try {
            const value = req.params.value;
            const salaries = await userService.getSalaries(value);
            return res.json(salaries);

        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const employees = await userService.getAllUsers();
            return res.json(employees)
        } catch (error) {
            next(error);
        }
    }

    async getBirthdays(req: Request, res: Response, next: NextFunction) {
        try {
            const value = req.params.value;
            const birthdays = await userService.getBirthdays(value);
            return res.json(birthdays);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired } = req.body;
            const updatedEmployee = await userService.updateEmployee(id, firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired);
            return res.json(updatedEmployee);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, dismissalDay } = req.body;
            const firedEmployeesData = await userService.deleteEmployee(id, dismissalDay);
            return res.json(firedEmployeesData);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();