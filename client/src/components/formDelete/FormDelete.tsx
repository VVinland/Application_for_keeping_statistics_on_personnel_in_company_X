import { useId, useState } from "react";
import EmployeeService from "../../services/employeeService";
import moment from 'moment';
import cl from './formDelet.module.css';


interface DismissalEmployeeProps {
    userId: number,
    setVisible: (value: boolean) => void
}

const FormDelete = ({ userId, setVisible }: DismissalEmployeeProps) => {

    const [dismissalDay, setDismissalDay] = useState<Date | any>(moment(new Date()).format('YYYY-MM-DD'));
    const idDismissalDay = useId();
    const handlerDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        EmployeeService.deleteUser(userId, dismissalDay).then(() => setVisible(false));
    }

    return (
        <div className={cl.FD}>
            <div>
                <label htmlFor={idDismissalDay}>Установите дату увольнения</label>
                <input type="date" placeholder="Выберите дату увольнения"
                    value={dismissalDay} id={idDismissalDay}
                    onChange={event => setDismissalDay(event.target.value)}
                    onKeyDown={(e) => {
                        e.preventDefault();
                    }}
                />
            </div>

            <button onClick={handlerDelete}>Подтвердить удаление</button>
        </div>
    );
}

export default FormDelete;