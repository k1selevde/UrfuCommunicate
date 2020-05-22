import React from 'react'
import s from './ControlBtn.module.css'

const ControlBtn = (props) => {
    return (
        <button
            onClick={() => {
                props.logOut()
                props.teacherOut()
                props.studentOut()
                }
            }
            className={s.btn}>
                <span className={s.text}>
                    ВЫЙТИ
                </span>
        </button>
    );
}

export default ControlBtn;