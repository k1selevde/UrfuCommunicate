import React from 'react'
import s from './Alert.module.css'

const SuccessAlert  = ({text,children}) => {
    return (
        <div className={s.sucContainer}>
            <div className={s.sucText}>{text}</div>
            <div className={s.sucChildrenLink}>{children}</div>
        </div>
    );
}

export default SuccessAlert;