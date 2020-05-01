import React from 'react'
import s from './Register.module.css'
import {validRegisterForm} from '../../helpers/validForm'
import {simpleValidRegister} from '../../helpers/validForm'
import Alert from '../Alert/Alert'

class RegisterForm extends React.Component  {
    constructor(props)
    {
        super(props)
        this.state = {
            name: '',
            surname: '',
            patronymic: '',
            email: '',
            group: '',
            checkbox: false,
            password: '',
            repeatPassword: ''
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
        //this.props.registerMe(name,surname,patronymic,email,group,checkbox,password);

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
        if (nextProps.error != null)
        {
            setTimeout(() => this.props.hideAlert(),2000)
        }
    }



    render() {
        const {error} = this.props
        const {name,surname,patronymic,email,group,checkbox,password,repeatPassword} = this.state;
        return (
            <div className="form-wrapper">

                <div className={s.alertBlock}>
                    {this.props.error && <Alert error={error}/>}
                </div>

                <form className={s.form} onSubmit={this.submitHandler}>
                    <div className={s.inputGroup}>
                        <input
                            value={name}
                            onChange={this.changeHandler}
                            className={s.inputField}
                            placeholder="Введите имя"
                            type="text"
                            name="name"
                            autoFocus
                        />
                        <input
                            onChange={this.changeHandler}
                            className={s.inputField}
                            placeholder="Введите фамилию"
                            type="text"
                            name="surname"
                            value={surname}
                        />
                        <input
                            className={s.inputField}
                            placeholder="Введите отчество"
                            type="text"
                            name="patronymic"
                            value={patronymic}
                            onChange={this.changeHandler}
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <input
                            className={s.inputField}
                            placeholder="Введите почту"
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className={s.inputGroup}>
                        <input
                            className={s.inputField}
                            placeholder="Введите группу"
                            type="text"
                            name="group"
                            value={group}
                            onChange={this.changeHandler}
                        />
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
                        <input
                            className={s.inputField}
                            placeholder="Введите пароль"
                            type="text"
                            name="password"
                            value={password}
                            onChange={this.changeHandler}
                        />
                        <input
                            className={s.inputField}
                            placeholder="Повторите пароль"
                            type="text"
                            name="repeatPassword"
                            onChange={this.changeHandler}
                            value={repeatPassword}
                        />
                    </div>

                    <button
                        className={s.submitBtn}
                        type="submit"
                        disabled={(!simpleValidRegister(this.state))}
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        )
    }

}


export default RegisterForm;