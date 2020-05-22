import React from 'react'
import {Link} from 'react-router-dom'
import s from './Register.module.css'
import RegisterFormContainer from "../../containers/RegisterFormContainer";

export default class Register extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <h4 className={s.title}>Страница регистрации</h4>
                <div className={s.text}>У вас уже есть &nbsp;
                     <Link style={{textDecoration: 'none'}} to="/">
                        <span className={s.link}>
                            аккаунт
                        </span>
                    </Link>
                    ?
                </div>
                <div className={s.formContainer}>
                    <RegisterFormContainer />
                </div>
            </div>
        )
    }
}