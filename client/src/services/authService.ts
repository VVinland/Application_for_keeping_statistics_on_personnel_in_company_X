import { AxiosResponse } from 'axios';
import $api from '../http/index';
import { AuthResponse } from "../interfaces";

class AuthService {
    static async registration(firstname: string, lastname: string, middlename: string, dateOfBirthday: Date, role: string, salaryAmount: number,
        dateHired: Date): Promise<AxiosResponse<any>> {
        return await $api.post('/employee/registration', {
            firstname, lastname, middlename, dateOfBirthday, role, salaryAmount,
            dateHired
        })
    }

    static async lastStageRegistration(email: string, password: string, link_registering: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post('/employee/lastStepOfRegisteringEmployee', {
            email, password, link_registering
        });
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post('/employee/login', {
            email, password
        });
    }

    static async logout(id: number): Promise<AxiosResponse<AuthResponse>> {
        return await $api.get(`/employee/login/${id}`);
    }
}


export default AuthService;