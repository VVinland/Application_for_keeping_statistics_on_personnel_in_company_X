import { useContext } from 'react';
import cl from './navbar.module.css';
import { Context } from '../..';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_MENU_ROUTE, STATISTICS_ROUTE } from '../../utils/consts';

const Navbar = () => {

    const { user } = useContext(Context);

    const navigate = useNavigate();


    return (
        <nav className={cl.Navbar_wrapper}>
            <li className={cl.Navbar_li}>
                <NavLink className={cl.Navbar_navLink} to={MAIN_MENU_ROUTE}>
                    Главное меню
                </NavLink>
            </li>

            {user.user.role === 'HR-manager' &&
                <li className={cl.Navbar_li}>
                    <NavLink className={cl.Navbar_navLink} to={STATISTICS_ROUTE} onClick={() => navigate(STATISTICS_ROUTE)}>
                        Статистика по персоналу
                    </NavLink>
                </li>}


            <li className={cl.Navbar_li}>
                <NavLink className={cl.Navbar_navLink} to={LOGIN_ROUTE} onClick={() => user.logout(user.user.id)}>
                    Выйти
                </NavLink>
            </li>

        </nav>
    );
}

export default Navbar;