import React from 'react'
import {Link} from 'react-router-dom'
import RegisterFormContainer from "../../containers/RegisterFormContainer";
import s from './Register.module.css'

export default class Register extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <div className={s.wrapper}>
                    <h4 className={s.title}>Страница регистрации</h4>
                    <div className={s.text}>
                        <div style={{opacity: '.52'}}>У вас уже есть</div> &nbsp;
                        <Link style={{textDecoration: 'none'}} to="/">
                        <span className={s.link}>
                            аккаунт
                        </span>
                        </Link>
                        ?
                    </div>
                    <div className={s.formContainer}>
                        <RegisterFormContainer/>
                    </div>
                </div>
            </div>
        )
    }
}