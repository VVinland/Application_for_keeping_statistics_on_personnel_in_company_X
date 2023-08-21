import { useEffect, useState } from 'react';
import cl from './pageStyles/statisticsStyle.module.css';
import HiredPeople from '../components/hiredPeople/HiredPeople';
import FiredPeople from '../components/firedPeople/FiredPeople';
import Salaries from '../components/salaries/Salaries';
import Birthdays from '../components/birthdays/Birthdays';

const StatisticsPage = () => {

    const [parametr, setParametr] = useState('');
    useEffect(() => {
        console.log(parametr);
    }, [parametr])
    return (
        <div className={cl.SP}>
            <select
                value={parametr}
                onChange={(event) => setParametr(event.target.value)}
            >
                <option value="" disabled>Выберите метрику для статистики</option>
                <option value='hired'>Получить количество нанятых</option>
                <option value='dismissed'>Получить количество уволенных</option>
                <option value='salaries'>Получить ожидаемыек выплаты зарплат</option>
                <option value='birthdays'>Получить дни рождения</option>
            </select>
            {parametr === 'hired' && <HiredPeople/>}
            {parametr === 'dismissed' && <FiredPeople/>}
            {parametr === 'salaries' && <Salaries/>}
            {parametr === 'birthdays' && <Birthdays/>}

        </div>
    );
}

export default StatisticsPage;