import React from 'react'
import s from './StudentProfile.module.css'
import SubjectItem from "./SubjectItem";
import SubjectGroup from "./SubjectGroup/SubjectGroup";

class StudentProfile extends React.Component {
    render() {
        const {subjects, getSubjectGroup, id, token, group, error} = this.props
        return (
            <div className={s.container}>
                <div className={s.groupWrapper}>
                    {(error || group.title) && <SubjectGroup error={error} group={group}/>}
                </div>
                <div className={s.subjectsWrapper}>
                    {subjects.map(sub => {
                        return (
                            <div  onClick={() => getSubjectGroup({subjectId: sub.id, id, token})}>
                                <SubjectItem sub={sub}/>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default StudentProfile;