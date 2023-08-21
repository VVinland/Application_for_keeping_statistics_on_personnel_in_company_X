import { useContext, useEffect, useState } from "react";
import { EmployeeData } from "../interfaces";
import { Context } from "..";
import EmployeeService from "../services/employeeService";
import cl from './pageStyles/mainMenu.module.css';
import Modal from "../components/modal/Modal";
import FormDelete from "../components/formDelete/FormDelete";
import { observer } from "mobx-react-lite";
import FormAdd from "../components/formAdd/FormAdd";
import { useNavigate } from "react-router-dom";
import { USER_ROUTE } from "../utils/consts";
import moment from 'moment';

const MainMenu = observer(() => {

    const { user } = useContext(Context);
    const [users, setUsers] = useState<EmployeeData[]>([]);
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        EmployeeService.getAllUsers().then((response) => {
            setUsers(response.data)
        });
    }, [visibleAdd, visibleDelete]);

    const handlerDelete = (id: number) => {
        setVisibleDelete(true);
        setUserId(id)
    }

    const handlerUpdate = (item: EmployeeData) => {
        navigate(USER_ROUTE, { state: { item } });
    }


    if (users.length > 0) {

        return (
            <div className={cl.MM}>
                {user.user.role === 'HR-manager' && <button onClick={() => setVisibleAdd(true)}>Добавить сотрудника</button>}
                {users.map((item) => {
                    return (
                        <div key={item.id} className={cl.MM_wrapper}>
                            <div className={cl.MM_block}>
                                <label className={cl.MM_block_label}>ФИО: {item.firstname} {item.lastname} {item.middlename}</label>
                                <label className={cl.MM_block_label}>Дата рождения: {
                                    moment(item.date_of_birth).format('YYYY-MM-DD')
                                }</label>
                                <label className={cl.MM_block_label}>Должность: {item.role}</label>
                                <label className={cl.MM_block_label}>Зарплата: {item.salary_amount}</label>
                                <label className={cl.MM_block_label}>Дата найма:
                                    {moment(item.hire_day).format('YYYY-MM-DD')}</label>
                            </div>
                            {
                                user.user.role === 'HR-manager' &&
                                <div className={cl.MM_block_btn}>
                                    <button onClick={() => handlerUpdate(item)}>Изменить</button>
                                    <button onClick={() => handlerDelete(item.id)}>Удалить</button>
                                </div>
                            }
                        </div>
                    )
                })}
                <Modal visible={visibleDelete}
                    setVisible={setVisibleDelete}
                >
                    <FormDelete userId={userId} setVisible={setVisibleDelete} />
                </Modal>

                <Modal
                    visible={visibleAdd}
                    setVisible={setVisibleAdd}
                >
                    <FormAdd setVisible={setVisibleAdd} />
                </Modal>
            </div>
        );
    }
})

export default MainMenu;
