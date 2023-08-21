import LoginPage from "../pages/LoginPage";
import MainMenu from "../pages/MainMenu";
import RegistrationPage from "../pages/RegistrationPage";
import StatisticsPage from "../pages/StatisticsPage";
import UserPage from "../pages/UserPage";
import { LOGIN_ROUTE, MAIN_MENU_ROUTE, REGISTRATION_ROUTE, STATISTICS_ROUTE, USER_ROUTE } from "../utils/consts";

const authRoutes = [
    {
        path: MAIN_MENU_ROUTE,
        Component: MainMenu
    }
];

const hrRoutes = [
    {
        path: MAIN_MENU_ROUTE,
        Component: MainMenu
    },
    {
        path: STATISTICS_ROUTE,
        Component: StatisticsPage
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    },
]

const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE + '/:link_registering',
        Component: RegistrationPage
    }
]

export {
    authRoutes,
    hrRoutes,
    publicRoutes
}