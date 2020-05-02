import React from 'react'
import s from './Home.module.css'
import {Link} from 'react-router-dom'
import AuthContainer from "../../containers/AuthContainer";

const Home  = () => {
    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>Страница входа</h3>
            <p className={s.text}>У вас еще нету аккаунта? &nbsp;
                <Link to="/register" style={{textDecoration: 'none'}}>
                    <span className={s.link}>
                        Зарегистрироваться
                    </span>
                </Link>
            </p>
            <AuthContainer />
        </div>
    );
}

export default Home;