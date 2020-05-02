import React from 'react'
import s from './NotFound.module.css'


const NotFound  = () => {
    return (
        <>
            <div className={s.wrap}>
                <p className={s.text}>Простите, страница не найдена . . .</p>
            </div>
        </>
    );
}

export default NotFound;