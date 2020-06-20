import React from 'react'
import cn from 'classnames'
import s from './StudentHome.module.css'


const StudentHome = ({isDayTheme}) => {
    return (
        <div className={s.container}>
            <h2
                className={cn(s.title,
                    {[s.title__light]: isDayTheme}
                    )}
            >
                Добро пожаловать
            </h2>
        </div>
    );
}

export default StudentHome;