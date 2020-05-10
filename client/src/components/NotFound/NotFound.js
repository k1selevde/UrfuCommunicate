import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './NotFound.module.css'


const NotFound  = ({linkToBack, textToBack}) => {
    return (
        <>
            <div className={s.wrap}>
                <NavLink to={linkToBack} className={s.backLink}>
                    {textToBack}
                </NavLink>
                <p className={s.text}>Простите, страница не найдена . . .</p>
            </div>
        </>
    );
}

export default NotFound;