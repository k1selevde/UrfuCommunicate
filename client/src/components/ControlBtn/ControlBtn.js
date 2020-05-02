import React from 'react'
import s from './ControlBtn.module.css'

const ControlBtn = (props) => {
    return (
        <button onClick={()=> props.logOut()} className={s.btn}>
            <span className={s.text}>
                ВЫЙТИ
            </span>
        </button>
    );
}

export default ControlBtn;