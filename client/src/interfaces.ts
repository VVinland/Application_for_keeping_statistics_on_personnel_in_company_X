import UserStore from "./store/userStore";

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface User {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    date_of_birth: Date;
    role: string;
    salary_amount: number;
    hire_day: Date;
    email?: string;
}

interface EmployeeData {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    date_of_birth: Date;
    role: string;
    salary_amount: number;
    hire_day: Date;
}

interface FiredEmployeeData {
    firstname: string;
    lastname: string;
    middlename: string;
    date_of_birth: Date;
    role: string;
    salary_amount: number;
    hire_day: Date;
    dismissalDay: Date;
}

interface Store {
    user: UserStore;
}

interface MonthAndSalaries {
    [key: string]: number;
}


export {
    type AuthResponse,
    type User,
    type EmployeeData,
    type FiredEmployeeData,
    type Store,
    type MonthAndSalaries
}