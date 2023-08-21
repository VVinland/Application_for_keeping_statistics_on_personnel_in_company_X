import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../..';
import { useContext, useEffect } from 'react';
import { authRoutes, hrRoutes, publicRoutes } from '../../routes/router';
import { LOGIN_ROUTE, MAIN_MENU_ROUTE, REGISTRATION_ROUTE, STATISTICS_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import Navbar from '../navbar/Navbar';
import cl from './appRouter.module.css';

const AppRouter = observer(() => {

    const { user } = useContext(Context);


    if (user.isLoading) {
        return <div>Загрузка</div>
    }

    if (!user.getIsAuth) {
        return (
            <div>
                <Routes>
                    {publicRoutes.map(item => {
                        return <Route key={item.path} path={item.path} element={<item.Component />} />
                    })}
                    <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
                </Routes>
            </div>
        )
    }

    if (user.getIsAuth && user.getUser.role !== 'HR-manager') {

        return (
            <div>
                <Navbar />
                <Routes>
                    {authRoutes.map(item => {
                        return <Route key={item.path} path={item.path} element={<item.Component />} />
                    })}
                    <Route path='*' element={<Navigate to={MAIN_MENU_ROUTE} />} />
                </Routes>
            </div>
        )
    }

    if (user.getIsAuth && user.getUser.role === 'HR-manager') {

        return (
            <div className={cl.AP_wrapper}>
                <Navbar />
                <Routes>
                    {hrRoutes.map(item => {
                        return <Route key={item.path} path={item.path} element={<item.Component />} />
                    })}
                    <Route path='*' element={<Navigate to={MAIN_MENU_ROUTE} />} />
                </Routes>
            </div>
        )
    }
})

export default AppRouter;