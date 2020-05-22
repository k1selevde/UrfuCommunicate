import React from 'react'
import s from './Alert.module.css'

const Alert  = ({error}) => {
    return (
        <div className={s.container}>
            <div className={s.message}><span className={s.error}>Ошибка:</span> {error}</div>
        </div>
    );
}

export default Alert;