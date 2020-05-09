import React from 'react'
import s from './NotFound.module.css'


const NotFound  = ({text}) => {
    return (
        <>
            <div className={s.wrap}>
                <p className={s.text}>Простите, страница не найдена . . .</p>
                <span>{text}</span>
            </div>
        </>
    );
}

export default NotFound;