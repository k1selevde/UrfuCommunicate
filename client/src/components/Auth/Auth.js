import React from 'react'
import {simpleValidAuth, validAuth} from "../../helpers/validForm";
import Alert from "../Alert/Alert";
import s from './Auth.module.css'


export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.state = {
            email: '',
            password: '12345'
        }
    }

    changeHandler(e) {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        this.setState(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    submitHandler(e) {
        e.preventDefault()
        if (!!validAuth(this.state))
        {
            this.props.setError(validAuth(this.state))
            return;
        }
        const {email,password} = this.state;
        this.props.logIn({email,password})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.error != null)
        {
            setTimeout(() => this.props.hideAlert(),2000)
        }
    }

    render() {
        const {error} = this.props;
        const {email, password} = this.state;
        return (
            <div className={s.formWrapper}>
                <div className={s.formBlock}>
                    <div className={s.alertBlock}>
                        {this.props.error && <Alert error={error}/>}
                    </div>
                    <form className={s.form} onSubmit={this.submitHandler}>
                        <div className={s.inputGroup}>
                            <div className={s.inputBox}>
                                <input
                                className={s.inputField}
                                // placeholder="Введите почту"
                                type="text"
                                name="email"
                                onChange={this.changeHandler}
                                value={email}

                                />
                                <label>Введите почту</label>
                            </div>
                            <div className={s.inputBox}>
                                <input
                                className={s.inputField}
                                // placeholder="Введите пароль"
                                type="text"
                                name="password"
                                onChange={this.changeHandler}
                                value={password}
                            />
                                <label>Введите пароль</label>
                            </div>
                        </div>
                        <button
                            className={s.submitBtn}
                            type="submit"
                            disabled={(!simpleValidAuth(this.state) || Boolean(error))}
                        >
                            ВОЙТИ
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}