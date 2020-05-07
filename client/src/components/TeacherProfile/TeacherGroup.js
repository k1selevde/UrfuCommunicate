import React from 'react'
import s from './Teacher.module.css'

const TeacherGroup  = ({group}) => {
    return (
        <div key={group.id} className={s.teacherGroupWrap}>
            <div className={s.teacherGroupTitle}>
                Группа: {group.title}
            </div>
        </div>
    );
}

export default TeacherGroup;