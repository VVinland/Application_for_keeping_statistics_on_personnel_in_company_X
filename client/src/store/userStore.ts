import { action, computed, makeObservable, observable } from "mobx";
import { AuthResponse, EmployeeData } from "../interfaces";
import AuthService from "../services/authService";
import axios from "axios";
import { API_URL } from "../utils/consts";

class UserStore {
    user = {} as EmployeeData;
    isAuth: boolean = false;
    isLoading: boolean = false;
    users = [] as EmployeeData[];


    constructor() {
        makeObservable(this,
            {
                users: observable,
                user: observable,
                isAuth: observable,
                isLoading: observable,
                getUser: computed,
                getIsAuth: computed,
                setIsLoading: action.bound,
                setUser: action.bound,
                setIsAuth: action.bound
            })
    }


    get getUser() {
        return this.user;
    }

    get getIsAuth() {
        return this.isAuth;
    }

    setUsers(users: EmployeeData[]) {
        this.users = users;
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setUser(user: EmployeeData) {
        this.user = user;
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('role', response.data.user.role);
            this.setUser(response.data.user);
            this.setIsAuth(true);
        } catch (error) {
            console.log(error);
        }
    }

    async registration(firstname: string, lastname: string, middlename: string, dateOfBirthday: Date, role: string, salaryAmount: number,
        dateHired: Date) {
        try {
            const response = await AuthService.registration(firstname, lastname, middlename, dateOfBirthday, role, salaryAmount,
                dateHired)

            return response.data.link_registering;
        } catch (error) {
            console.log(error);
        }
    }

    async lastStageRegistration(email: string, password: string, link_registering: string) {
        try {
            const response = await AuthService.lastStageRegistration(email, password, link_registering);

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('role', response.data.user.role);
            this.setUser(response.data.user);
            this.setIsAuth(true);
        } catch (error) {
            console.log(error);
        }
    }

    async logout(id: number,) {
        try {
            await AuthService.logout(id);
            localStorage.removeItem('accessToken');
            this.setUser({} as EmployeeData);
            this.setIsAuth(false);
        } catch (error) {
            console.log(error);
        }
    }

    async checkAuth() {
        this.setIsLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/employee/refresh`, { withCredentials: true });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('role', response.data.user.role);

            this.setUser(response.data.user);
            this.setIsAuth(true);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    }
}

export default UserStore;