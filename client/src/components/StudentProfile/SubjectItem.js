import React from 'react'
import {NavLink} from 'react-router-dom'
import s from "./StudentProfile.module.css";

const SubjectItem  = ({sub}) => {
    return (
        <NavLink
            to={`/studentProfile/sub-${sub.id}`}
            key={sub.id}
            className={s.subjectTitleWrap}
        >
                <div className={s.subjectTitle}>
                    {sub.title}
                </div>
        </NavLink>
    );
}

export default SubjectItem;