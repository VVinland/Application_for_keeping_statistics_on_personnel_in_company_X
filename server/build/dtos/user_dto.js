class UserDto {
    id;
    firstname;
    lastname;
    middlename;
    date_of_birth;
    role;
    salary_amount;
    hire_day;
    email;
    constructor(data) {
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
