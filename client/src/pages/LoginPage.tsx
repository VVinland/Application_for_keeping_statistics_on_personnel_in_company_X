import { useContext, useId, useState } from 'react';
import cl from './pageStyles/loginPage.module.css';
import { Context } from '..';



const LoginPage = () => {

    const { user } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const idEmail = useId();
    const idPass = useId();

    return (
        <div className={cl.LoginPage_wrapper}>
            <div className={cl.LoginPage_div}>
                <label className={cl.LoginPage_div_label} htmlFor={idEmail}>Емаил</label>
                <input
                    value={email}
                    onChange={(event => setEmail(event.target.value))}
                    className={cl.LoginPage_div_input} type='text' autoComplete="off" id={idEmail} placeholder="Емаил" />
            </div>
            <div className={cl.LoginPage_div}>
                <label className={cl.LoginPage_div_label} htmlFor={idPass}>Пароль</label>
                <input
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    className={cl.LoginPage_div_input} type='password' autoComplete="off" id={idPass} placeholder="Пароль" />
            </div>
            <button className={cl.LoginPage_button} onClick={() => user.login(email, password)}>Авторизироваться</button>
        </div >
    );
}

export default LoginPage;