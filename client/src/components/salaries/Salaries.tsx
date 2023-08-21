import { useEffect, useId, useState } from "react";
import EmployeeService from "../../services/employeeService";
import { MonthAndSalaries } from "../../interfaces";
import cl from './salaries.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
const Salaries = () => {

    const [value, setValue] = useState('');
    const idSalaries = useId();
    const [salaries, setSalaries] = useState({} as MonthAndSalaries);

    useEffect(() => {
        if (value) {
            EmployeeService.getSalaryPayments(value).then(response => setSalaries(response.data))
        }
    }, [value])

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'white'
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },

        },
    };

    const data = {
        labels: [...Object.keys(salaries)],
        datasets: [
            {
                fill: true,
                data: [...Object.values(salaries)],
                borderColor: ['darkblue'],
                backgroundColor: ['aqua'],
            },
        ],
    };

    return (
        <div className={cl.Salaries}>
            <div className={cl.valueBlocks}>
                <div className={cl.block}>
                    <label htmlFor={idSalaries}>Ожидаемые выплаты ЗП за текущий год</label>
                    <input type="radio" id={idSalaries}
                        value={'For the current year'}
                        checked={value === 'For the current year'}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </div>
            </div>
            {Object.keys(salaries).length > 0 && <div className={cl.chart}><Line options={options} data={data} />
            </div>}
        </div >
    );
}

export default Salaries;