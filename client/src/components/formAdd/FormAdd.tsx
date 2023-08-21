import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { CLIENT_URL, REGISTRATION_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import moment from 'moment';
import cl from './fromAdd.module.css';

interface FormAddProps {
    setVisible: (value: boolean) => void
}

const FormAdd = observer(({ setVisible }: FormAddProps) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | any>(moment(new Date()).format('YYYY-MM-DD'));
    const [role, setRole] = useState('Сотрудник');
    const [salaryAmount, setSalaryAmount] = useState(1);
    const [dateHired, setDateHired] = useState<Date | any>(moment(new Date()).format('YYYY-MM-DD'));

    const { user } = useContext(Context);

    const handlerClick = async () => {
        await user.registration(firstname, lastname, middlename, dateOfBirth, role, salaryAmount, dateHired)
            .then(link_registering => {
                if (!link_registering) {
                    alert('Введены не все данные');
                    return;
                }
                setVisible(false);
                alert(`${CLIENT_URL}${REGISTRATION_ROUTE}/${link_registering}`);
                setFirstname('');
                setLastname('');
                setMiddlename('');
                setDateOfBirth(moment(new Date()).format('YYYY-MM-DD'))
                setRole('Сотрудник');
                setSalaryAmount(1);
                setDateHired(moment(new Date()).format('YYYY-MM-DD'))
            });
    }

    return (
        <div className={cl.FormAdd}>
            <div className={cl.FormAdd_sub}>
                <label htmlFor="">Введите имя</label>
                <input type="text" placeholder="Имя" autoComplete="off"
                    value={firstname} onChange={(event) => setFirstname(event.target.value)} />
            </div>
            <div className={cl.FormAdd_sub}>
                <label htmlFor="">Введите Фамилию</label>
                <input type="text" placeholder="Фамилию" autoComplete="off"
                    value={lastname} onChange={(event) => setLastname(event.target.value)} />
            </div>
            <div className={cl.FormAdd_sub}>
                <label htmlFor="">Введите Отчество</label>
                <input type="text" placeholder="Отчество" autoComplete="off"
                    value={middlename} onChange={(event) => setMiddlename(event.target.value)} />
            </div>
            <div className={cl.FormAdd_sub}>
                <label htmlFor="">Установите дату рождения</label>
                <input type="date" placeholder="Дата рождения" onKeyDown={(e) => {
                    e.preventDefault();
                }} autoComplete="off"
                    value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
            </div>
            <div className={cl.FormAdd_sub}>
                <label htmlFor="">Выберите должность</label>
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                    <option >Сотрудник</option>
                    <option >HR-manager</option>
                </select>
            </div>
            <div className={cl.FormAdd_sub}>
                <label htmlFor="">Введите зарплату</label>
                <input type="text" placeholder="Зарплата" autoComplete="off"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    value={salaryAmount} onChange={(event) => setSalaryAmount(Number(event.target.value))} />
            </div>
            <div className={cl.FormAdd_sub}>
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
})


export default FormAdd;