import React from 'react'
import s from './GroupLink.module.css'
import {NavLink} from 'react-router-dom'


const TeacherGroupLink  = ({group}) => {
    return (
        <NavLink to={`/teacherProfile/group-${group.id}`} key={group.id} className={s.teacherGroupWrap}>
            <div  className={s.teacherGroupTitle}>
                Группа: {group.title}
            </div>
        </NavLink>
    );
}

export default TeacherGroupLink;