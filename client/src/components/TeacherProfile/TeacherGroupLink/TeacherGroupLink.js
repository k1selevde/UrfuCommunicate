import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './GroupLink.module.css'


const TeacherGroupLink  = ({group}) => {
    return (
        <NavLink
            activeClassName={s.teacherGroupWrapActive}
            to={`/teacherProfile/group-${group.id}`}
            key={group.id}
            className={s.teacherGroupWrap}
        >
            <div  className={s.teacherGroupTitle}>
                Группа: {group.title}
            </div>
        </NavLink>
    );
}

export default TeacherGroupLink;