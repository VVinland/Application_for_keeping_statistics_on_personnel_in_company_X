import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import db from './../db.js';
import tokenService from './token_service.js';
import UserDto from './../dtos/user_dto.js';
import ApiError from '../exceptions/apiError.js';
class UserService {
    async registration(firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired) {
        const link_registering = v4();
        const newEmployee = await db.query(`INSERT INTO EMPLOYEE(firstname, lastname, middlename,
            date_of_birth, role, salary_amount, hire_day) values($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired]);
        const newEmployeeLink_registering = await db.query(`INSERT INTO LAST_STEP_OF_REGISTERING_EMPLOYEE (user_id, link_registering)
            values($1, $2) RETURNING link_registering`, [
            newEmployee.rows[0].id, link_registering
        ]);
        return newEmployeeLink_registering.rows[0].link_registering;
    }
    async lastStepOfRegisteringEmployee(email, password, link_registering) {
        let candidate = await db.query(`SELECT * FROM LAST_STEP_OF_REGISTERING_EMPLOYEE WHERE email=$1`, [email]);
        if (candidate.rows.length !== 0) {
            throw ApiError.BadRequest("User with this email is already registered");
        }
        const hashPassword = await bcrypt.hash(password, 8);
        candidate = await db.query(`UPDATE LAST_STEP_OF_REGISTERING_EMPLOYEE SET password=$1, email=$2
                WHERE link_registering=$3 RETURNING user_id`, [hashPassword, email, link_registering]);
        const user = await db.query(`SELECT * FROM EMPLOYEE WHERE id=$1`, [candidate.rows[0].user_id]);
        const userDto = new UserDto({ ...user.rows[0], email });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(user.rows[0].id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        };
    }
    async login(email, password) {
        let candidate = await db.query(`SELECT * FROM LAST_STEP_OF_REGISTERING_EMPLOYEE WHERE email=$1`, [email]);
        if (candidate.rows.length === 0) {
            throw ApiError.BadRequest("Invalid email entered");
        }
        const comparePasswords = await bcrypt.compare(password, candidate.rows[0].password);
        if (!comparePasswords) {
            throw ApiError.BadRequest('Invalid password entered');
        }
        const user = await db.query(`SELECT * FROM EMPLOYEE WHERE id=$1`, [candidate.rows[0].user_id]);
        const userDto = new UserDto({ ...user.rows[0], email });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(user.rows[0].id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        };
    }
    async logout(id) {
        await tokenService.removeToken(id);
        return;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UserNotAuthorized();
        }
        const employeeData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!employeeData || !tokenFromDb) {
            throw ApiError.UserNotAuthorized();
        }
        let email = await db.query(`SELECT email FROM LAST_STEP_OF_REGISTERING_EMPLOYEE WHERE user_id=$1`, [tokenFromDb.user_id]);
        email = email.rows[0].email;
        const user = await db.query(`SELECT * FROM EMPLOYEE WHERE id=$1`, [employeeData.id]);
        const userDto = new UserDto({ ...user.rows[0], email });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        };
    }
    async getAllUsers() {
        const employees = await db.query(`SELECT * FROM EMPLOYEE`);
        return employees.rows;
    }
    async updateEmployee(id, firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired) {
        const updatedEmployee = await db.query(`UPDATE EMPLOYEE SET firstname=$1, lastname=$2, middlename=$3, date_of_birth=$4, role=$5,
        salary_Amount=$6, hire_day=$7 WHERE id=$8 RETURNING *`, [
            firstname, lastname, middlename, dateOfBirthday, role, salaryAmount, dateHired, id
        ]);
        return updatedEmployee.rows[0];
    }
    async getNumberHiredEmployees(value) {
        switch (value) {
            case 'For the current month':
                {
                    const count = await db.query(`SELECT SUM((SELECT COUNT(*) FROM EMPLOYEE
                                                    WHERE date_part('month', hire_day)
                                                          =
                                                    EXTRACT(MONTH FROM NOW()))
                                                           +
                                                      (SELECT COUNT(*) FROM FIRED_EMPLOYEES
                                                      WHERE date_part('month', hire_day)
                                                          =
                                                      EXTRACT(MONTH FROM NOW()))) as count`);
                    return count.rows[0].count;
                }
                ;
            case 'For the current year':
                {
                    const count = await db.query(`SELECT SUM((SELECT COUNT(*) FROM EMPLOYEE
                                                        WHERE date_part('year', hire_day)
                                                                =
                                                        EXTRACT(YEAR FROM NOW()))
                                                                +
                                                         (SELECT COUNT(*) FROM FIRED_EMPLOYEES
                                                            WHERE date_part('year', hire_day)
                                                                =
                                                            EXTRACT(YEAR FROM NOW()))) as count`);
                    return count.rows[0].count;
                }
                ;
            default: {
                return 0;
            }
        }
    }
    async getBirthdays(value) {
        switch (value) {
            case 'For the current month':
                {
                    const birthdays = await db.query(`SELECT * FROM EMPLOYEE
                    WHERE date_part('month', date_of_birth)
                    =
                    EXTRACT(MONTH FROM NOW())
                    `);
                    return birthdays.rows;
                }
                ;
            default: {
                return [];
            }
        }
    }
    async deleteEmployee(id, dismissalDay) {
        const employeeData = await db.query(`SELECT * FROM EMPLOYEE WHERE id=$1`, [id]);
        const email = await db.query(`SELECT email FROM LAST_STEP_OF_REGISTERING_EMPLOYEE WHERE user_id=$1`, [id]);
        await db.query(`DELETE FROM LAST_STEP_OF_REGISTERING_EMPLOYEE WHERE user_id=$1`, [id]);
        await tokenService.removeToken(id);
        await db.query(`DELETE FROM EMPLOYEE WHERE id=$1`, [id]);
        const firedEmployeesData = await db.query(`INSERT INTO FIRED_EMPLOYEES(firstname, lastname, middlename,
            date_of_birth, role, salary_amount, hire_day, dismissal_day, email) values($1, $2, $3, $4, $5, $6, $7,$8, $9) RETURNING *`, [
            employeeData.rows[0].firstname, employeeData.rows[0].lastname, employeeData.rows[0].middlename,
            employeeData.rows[0].date_of_birth, employeeData.rows[0].role, employeeData.rows[0].salary_amount,
            employeeData.rows[0].hire_day, dismissalDay, email.rows[0].email
        ]);
        return firedEmployeesData.rows[0];
    }
    async getNumberFiredEmployees(value) {
        switch (value) {
            case 'For the current month':
                {
                    const count = await db.query(`SELECT COUNT(*) FROM FIRED_EMPLOYEES
                                              WHERE date_part('month', dismissal_day)
                                                            =
                                              EXTRACT(MONTH FROM NOW());`);
                    return count.rows[0].count;
                }
                ;
            case 'For the current year':
                {
                    const count = await db.query(`SELECT COUNT(*) FROM FIRED_EMPLOYEES
                                              WHERE date_part('year', dismissal_day)
                                                             =
                                              EXTRACT(YEAR FROM NOW());`);
                    return count.rows[0].count;
                }
                ;
            default: {
                return 0;
            }
        }
    }
    async getSalaries(value) {
        switch (value) {
            case 'For the current year': {
                const tableEmployee = await db.query(`SELECT EXTRACT(MONTH FROM hire_day) as hireMonth, salary_amount as salary, 
                EXTRACT(YEAR FROM hire_day) as hireYear FROM EMPLOYEE`);
                const tableFiredEmployees = await db.query(`SELECT EXTRACT(MONTH FROM hire_day) as hireMonth, salary_amount as salary,
                 EXTRACT(YEAR FROM hire_day) as hireYear, EXTRACT(MONTH FROM dismissal_day) as fireMonth, EXTRACT(YEAR FROM dismissal_day)
                  as fireYear FROM FIRED_EMPLOYEES`);
                const result = getSalariesResult(tableEmployee.rows, tableFiredEmployees.rows);
                return result;
            }
            default: {
                return {};
            }
        }
    }
}
function getSalariesResult(employees, firedEmployees) {
    const monthEmployees = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
    };
    const monthFiredEmployees = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
    };
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].hireyear > new Date().getFullYear().toString()) {
            continue;
        }
        else if (employees[i].hireyear === new Date().getFullYear().toString()) {
            for (let y = Number(employees[i].hiremonth); y <= 12; y++) {
                monthEmployees[y] += employees[i].salary;
            }
        }
        else if (employees[i].hireyear < new Date().getFullYear().toString()) {
            for (let y = 1; y <= 12; y++) {
                monthEmployees[y] += employees[i].salary;
            }
        }
    }
    for (let i = 0; i < firedEmployees.length; i++) {
        if (firedEmployees[i].hireyear > new Date().getFullYear().toString()) {
            continue;
        }
        else if (firedEmployees[i].hireyear === new Date().getFullYear().toString() && firedEmployees[i].fireyear === new Date().getFullYear().toString()) {
            for (let y = Number(firedEmployees[i].hiremonth); y < Number(firedEmployees[i].firemonth); y++) {
                monthFiredEmployees[y] += firedEmployees[i].salary;
            }
        }
        else if (firedEmployees[i].hireyear === new Date().getFullYear().toString() && firedEmployees[i].fireyear > new Date().getFullYear().toString()) {
            for (let y = Number(firedEmployees[i].hiremonth); y < 12; y++) {
                monthFiredEmployees[y] += firedEmployees[i].salary;
            }
        }
        else if (firedEmployees[i].hireyear < new Date().getFullYear().toString() && firedEmployees[i].fireyear < new Date().getFullYear().toString()) {
            continue;
        }
        else if (firedEmployees[i].hireyear < new Date().getFullYear().toString() && firedEmployees[i].fireyear > new Date().getFullYear().toString()) {
            for (let y = 1; y <= 12; y++) {
                monthFiredEmployees[y] += firedEmployees[i].salary;
            }
        }
        else if (firedEmployees[i].hireyear < new Date().getFullYear().toString() && firedEmployees[i].fireyear === new Date().getFullYear().toString()) {
            for (let y = 1; y < Number(firedEmployees[i].firemonth); y++) {
                monthFiredEmployees[y] += firedEmployees[i].salary;
            }
        }
    }
    const result = {
        'Январь': monthEmployees[1] + monthFiredEmployees[1],
        'Февраль': monthEmployees[2] + monthFiredEmployees[2],
        'Март': monthEmployees[3] + monthFiredEmployees[3],
        'Апрель': monthEmployees[4] + monthFiredEmployees[4],
        'Май': monthEmployees[5] + monthFiredEmployees[5],
        'Июнь': monthEmployees[6] + monthFiredEmployees[6],
        'Июль': monthEmployees[7] + monthFiredEmployees[7],
        'Август': monthEmployees[8] + monthFiredEmployees[8],
        'Сентябрь': monthEmployees[9] + monthFiredEmployees[9],
        'Октябрь': monthEmployees[10] + monthFiredEmployees[10],
        'Ноябрь': monthEmployees[11] + monthFiredEmployees[11],
        'Декабрь': monthEmployees[12] + monthFiredEmployees[12],
    };
    return result;
}
export default new UserService();
