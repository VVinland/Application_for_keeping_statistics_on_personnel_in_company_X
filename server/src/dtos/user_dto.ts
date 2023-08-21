interface UserData {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    date_of_birth: Date;
    role: string;
    salary_amount: number;
    hire_day: Date;
    email: string;
}

class UserDto {

     id: number;
    private firstname: string;
    private lastname: string;
    private middlename: string;
    private date_of_birth: Date;
    private role: string;
    private salary_amount: number;
    private hire_day: Date;
    private email: string;


    constructor(data: UserData) {
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.middlename = data.middlename;
        this.date_of_birth = data.date_of_birth;
        this.role = data.role;
        this.salary_amount = data.salary_amount;
        this.hire_day = data.hire_day;
        this.email = data.email;
    }
}

export default UserDto;