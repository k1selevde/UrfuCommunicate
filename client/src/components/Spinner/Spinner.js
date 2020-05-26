import React from 'react'
import s from './Spinner.module.css'


const Spinner  = () => {
    return (
        <div className={s.preloaderWrap}>
            <div className={s.preloader}></div>
        </div>
    );
}

export default Spinner;