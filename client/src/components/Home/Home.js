import React from 'react'
import {Link} from 'react-router-dom'
import AuthContainer from "../../containers/AuthContainer";
import s from './Home.module.css'

const Home = () => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <h3 className={s.title}>Страница входа</h3>
                <p className={s.text}>
                    <div style={{opacity: '.52'}}>У вас еще нету аккаунта?</div> &nbsp;
                    <Link className={s.link}
                          to="/register" style={{textDecoration: 'none'}}>
                        Зарегистрироваться
                    </Link>
                </p>
                <AuthContainer/>
            </div>
        </div>
    );
}

export default Home;