import React from 'react'
import cn from 'classnames'
import s from './TeacherHome.module.css'


const TeacherHome = ({isDayTheme}) => {
    return (
        <div className={s.container}>
            <p className={cn(s.welcome,
                {[s.welcome__light]: isDayTheme}
                )}
            >
                Добро пожаловать
            </p>
        </div>
    );
}

export default TeacherHome;