import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import cl from './pageStyles/UserPage.module.css';
import EmployeeService from "../services/employeeService";
import { MAIN_MENU_ROUTE } from "../utils/consts";
import moment from 'moment';



const UserPage = () => {

    const { state } = useLocation();
    const [firstname, setFirstname] = useState(state.item.firstname);
    const [lastname, setLastname] = useState(state.item.lastname);
    const [middlename, setMiddlename] = useState(state.item.middlename);
    const [dateOfBirth, setDateOfBirth] = useState<Date | any>(moment(state.item.date_of_birth).format('YYYY-MM-DD'));
    const [role, setRole] = useState(state.item.role);
    const [salaryAmount, setSalaryAmount] = useState(state.item.salary_amount);
    const [dateHired, setDateHired] = useState<Date | any>(moment(state.item.hire_day).format('YYYY-MM-DD'));

    const { user } = useContext(Context);
    const navigate = useNavigate();
    const handlerClick = async () => {
        await EmployeeService.updateUser(state.item.id, firstname, lastname, middlename, dateOfBirth, role, salaryAmount, dateHired)
            .then(() => navigate(MAIN_MENU_ROUTE));
    }
    console.log(dateOfBirth);
    
    return (
        <div className={cl.UserPage}>
            <div className={cl.UserPage_sub}>
                <label htmlFor="">Введите имя</label>
                <input type="text" placeholder="Имя" autoComplete="off"
                    value={firstname} onChange={(event) => setFirstname(event.target.value)} />
            </div>
            <div className={cl.UserPage_sub}>
                <label htmlFor="">Введите Фамилию</label>
                <input type="text" placeholder="Фамилию" autoComplete="off"
                    value={lastname} onChange={(event) => setLastname(event.target.value)} />
            </div>
            <div className={cl.UserPage_sub}>
                <label htmlFor="">Введите Отчество</label>
                <input type="text" placeholder="Отчество" autoComplete="off"
                    value={middlename} onChange={(event) => setMiddlename(event.target.value)} />
            </div>
            <div className={cl.UserPage_sub}>
                <label htmlFor="">Установите дату рождения</label>
                <input type="date" placeholder="Дата рождения" onKeyDown={(e) => {
                    e.preventDefault();
                }} autoComplete="off"
                    value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
            </div>
            <div className={cl.UserPage_sub}>
                <label htmlFor="">Выберите должность</label>
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                    <option >Сотрудник</option>
                    <option >HR-manager</option>
                </select>
            </div>
            <div className={cl.UserPage_sub}>
                <label htmlFor="">Введите зарплату</label>
                <input type="text" placeholder="Зарплата" autoComplete="off"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    value={salaryAmount} onChange={(event) => setSalaryAmount(Number(event.target.value))} />
            </div>
            <div className={cl.UserPage_sub}>
                <label htmlFor="">Установите дату найма</label>
                <input type="date" placeholder="Дата найма" autoComplete="off"
                    onKeyDown={(e) => {
                        e.preventDefault();
                    }}
                    value={dateHired} onChange={(event) => setDateHired(event.target.value)} />
            </div>
            <button onClick={handlerClick}>Зарегистрировать пользователя</button>
        </div>
    );
}

export default UserPage;