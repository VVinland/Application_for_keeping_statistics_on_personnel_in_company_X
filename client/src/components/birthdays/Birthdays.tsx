import { useState, useId, useEffect } from "react";
import { EmployeeData } from "../../interfaces";
import EmployeeService from "../../services/employeeService";
import moment from 'moment';
import cl from './birthdays.module.css';

const Birthdays = () => {
    const [value, setValue] = useState('');
    const idCurrentMonth = useId();
    const [count, setCount] = useState([] as EmployeeData[]);

    useEffect(() => {
        if (value) {
            EmployeeService.getBirthdays(value).then(response => setCount(response.data));
        }
    }, [value])

    return (
        <div className={cl.Birthdays}>
            <div className={cl.valueBlocks}>
                <div className={cl.block}>
                    <label htmlFor={idCurrentMonth}>За текущий месяц</label>
                    <input id={idCurrentMonth} type='radio'
                        value={'For the current month'}
                        checked={value === 'For the current month'}
                        onChange={event => setValue(event.target.value)}
                    />
                </div>
            </div>
            {count.length > 0
                ? <div className={cl.listBirthdays}>
                    {count.map(item => {
                        return (
                            <div key={item.id} className={cl.birthdays}>
                                <div>ФИО: {item.firstname} {item.lastname} {item.middlename}</div>
                                <div>Даты дня рождения: {
                                    moment(item.date_of_birth).format('YYYY-MM-DD')}</div>
                            </div>
                        )
                    })}
                </div>
                : <div className={cl.No_listBirthdays}>Ближайщих дней рождений нет</div>
            }
        </div>
    );
}

export default Birthdays;