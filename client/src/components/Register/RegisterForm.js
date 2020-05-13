import React from 'react'
import {validRegisterForm} from '../../helpers/validForm'
import {simpleValidRegister} from '../../helpers/validForm'
import Alert from '../Alert/Alert'
import s from './Register.module.css'

class RegisterForm extends React.Component  {
    constructor(props)
    {
        super(props)
        this.state = {
            name: 'Den',
            surname: 'Abra',
            patronymic: 'Aler',
            email: 'abra@yandex.ru',
            group: '12',
            checkbox: false,
            password: '12345',
            repeatPassword: '12345'
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this)
    }

    submitHandler(e) {
        e.preventDefault()
        if (!!validRegisterForm(this.state))
        {
            this.props.setError(validRegisterForm(this.state))
            return;
        }
        const {name,surname,patronymic,email,group,checkbox,password} = this.state;
        this.props.registerMe({name,surname,patronymic,email,group,checkbox,password});

    }

    async changeHandler(e) {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        await this.setState(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }
    async checkboxChangeHandler(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.checked;
        await this.setState(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.error !== "" )
        {
            setTimeout(() => this.props.hideAlert(),2000)
        }
    }



    render() {
        const {error} = this.props
        const {name,surname,patronymic,email,group,checkbox,password,repeatPassword} = this.state;
        return (
            <div className={s.formWrapper}>

                <div className={s.alertBlock}>
                    {this.props.error && <Alert error={error}/>}
                </div>

                <form className={s.form} onSubmit={this.submitHandler}>
                    <div className={s.inputGroup}>
                        <div className={s.inputBox}>
                            <input
                                value={name}
                                onChange={this.changeHandler}
                                className={s.inputField}
                                // placeholder="Введите имя"
                                type="text"
                                name="name"
                                autoFocus
                            />
                            <label>Имя</label>
                        </div>
                        <div className={s.inputBox}>
                            <input
                            onChange={this.changeHandler}
                            className={s.inputField}
                            // placeholder="Введите фамилию"
                            type="text"
                            name="surname"
                            value={surname}
                            />
                            <label>Фамилия</label>
                        </div>
                        <div className={s.inputBox}>
                            <input
                            className={s.inputField}
                            // placeholder="Введите отчество"
                            type="text"
                            name="patronymic"
                            value={patronymic}
                            onChange={this.changeHandler}
                            />
                            <label>Отчество</label>
                        </div>
                    </div>

                    <div className={s.inputGroup}>
                        <div className={s.inputBox}>
                            <input
                            className={s.inputField}
                           // placeholder="Введите почту"
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.changeHandler}
                            />
                            <label>Почта</label>
                        </div>
                    </div>
                    <div className={s.inputGroup}>
                        <div className={s.inputBox}>
                            <input
                            className={s.inputField}
                            // placeholder="Введите группу"
                            type="text"
                            name="group"
                            value={group}
                            onChange={this.changeHandler}
                            />
                            <label>Группа</label>
                        </div>
                        <div className={s.or}>или</div>
                        <div>
                            <input
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                                onChange={this.checkboxChangeHandler}
                                checked={checkbox}
                            />
                            <label className={s.checkLabel} htmlFor="checkbox">Я преподаватель</label></div>
                    </div>

                    <div className={s.inputGroup}>
                        <div className={s.inputBox}>
                            <input
                            className={s.inputField}
                            //placeholder="Введите пароль"
                            type="text"
                            name="password"
                            value={password}
                            onChange={this.changeHandler}
                            />
                            <label>Пароль</label>
                        </div>
                        <div className={s.inputBox}>
                            <input
                            className={s.inputField}
                            // placeholder="Повторите пароль"
                            type="text"
                            name="repeatPassword"
                            onChange={this.changeHandler}
                            value={repeatPassword}
                            />
                            <label>Повторный пароль</label>
                        </div>
                    </div>

                    <button
                        className={s.submitBtn}
                        type="submit"
                        disabled={(!simpleValidRegister(this.state) || Boolean(error))}
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        )
    }

}


export default RegisterForm;