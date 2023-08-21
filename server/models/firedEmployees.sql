CREATE TABLE FIRED_EMPLOYEES(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    middlename VARCHAR(64) NOT NULL,
    date_of_birth date NOT NULL,
    role TEXT NOT NULL,
    salary_amount INTEGER NOT NULL,
    hire_day date NOT NULL,
    dismissal_day date NOT NULL,
    email VARCHAR(64) UNIQUE
);