import { useEffect, useId, useState } from "react";
import EmployeeService from "../../services/employeeService";
import cl from './firedPeople.module.css';

const FiredPeople = () => {
    const [value, setValue] = useState('');
    const idCurrentMonth = useId();
    const idCurrentYear = useId();
    const [count, setCount] = useState<undefined | number>();

    useEffect(() => {
        if (value) {
            EmployeeService.getNumberDismissed(value).then(response => setCount(response.data.count));
        }
    }, [value])

    return (
        <div className={cl.FP}>
            <div className={cl.valueBlocks}>
                <div className={cl.block}>
                    <label htmlFor={idCurrentMonth}>За текущий месяц</label>
                    <input
                        name='hiderPeople' id={idCurrentMonth} type="radio"
                        value={'For the current month'}
                        checked={value === 'For the current month'}
                        onChange={(event) => {
                            setValue(event.target.value)
                        }
                        }
                    />
                </div>
                <div className={cl.block}>
                    <label htmlFor={idCurrentYear}>За текущий год</label>
                    <input name='hiderPeople' id={idCurrentYear} type="radio"
                        value={'For the current year'}
                        checked={value === 'For the current year'}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </div>
            </div>

            {count && <div>
                <span>{count}</span>
            </div>}
        </div>
    )
}

export default FiredPeople;