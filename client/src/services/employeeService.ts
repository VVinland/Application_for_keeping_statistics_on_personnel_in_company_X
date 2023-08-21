import { AxiosResponse } from "axios";
import $api from "../http";
import { EmployeeData, FiredEmployeeData, MonthAndSalaries } from "../interfaces";


class EmployeeService {

    static async getNumberHired(value: string): Promise<AxiosResponse<any>> {
        return await $api.get(`/employee/numberHired/${value}`);
    }

    static async getNumberDismissed(value: string): Promise<AxiosResponse<any>> {
        return await $api.get(`/employee/numberDismissed/${value}`);
    }

    static async getSalaryPayments(value: string): Promise<AxiosResponse<MonthAndSalaries>> {
        return await $api.get(`/employee/salaryPayments/${value}`);
    }

    static async getAllUsers(): Promise<AxiosResponse<EmployeeData[]>> {
        return await $api.get<EmployeeData[]>('/employee/getAllUsers');
    }

    static async getBirthdays(value: string): Promise<AxiosResponse<EmployeeData[]>> {
        return await $api.get(`/employee/birthdays/${value}`);
    }

    static async updateUser(id: number, firstname: string, lastname: string, middlename: string, dateOfBirthday: Date, role: string, salaryAmount: number,
        dateHired: Date): Promise<AxiosResponse<EmployeeData>> {
        return await $api.put('/employee/employee', {
            id, firstname, lastname, middlename, dateOfBirthday, role, salaryAmount,
            dateHired
        })
    }

    static async deleteUser(id: number, dismissalDay: Date): Promise<AxiosResponse<FiredEmployeeData>> {
        return await $api.delete('/employee/employee', { data: { id, dismissalDay } });
    }
}

export default EmployeeService;