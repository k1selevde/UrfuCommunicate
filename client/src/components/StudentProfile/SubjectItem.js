import React from 'react'
import s from "./StudentProfile.module.css";
import {withRouter} from 'react-router-dom'

const SubjectItem  = ({sub,history}) => {

    let subHandler = () => {
        console.log('Click on: ', sub.title)
        history.push(`/studentProfile/group-${sub.id}`)
    }

    return (
        <div
            onClick={() => {subHandler()}}
            key={sub.id}
            className={s.subjectTitleWrap}>
                <div className={s.subjectTitle}>
                    {sub.title}
                </div>
        </div>
    );
}

export default withRouter(SubjectItem);