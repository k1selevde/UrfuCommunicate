import React from 'react'
import TeacherGroup from "./TeacherGroup";
import {TeacherRoutes} from "./TeacherRoutes";
import {NavLink} from 'react-router-dom'
import s from './Teacher.module.css'

class teacherProfile extends React.Component {
    render() {
        const {groups} = this.props
        return (
            <div className={s.mainContainer}>
                <div className={s.content}>
                    <TeacherRoutes />
                </div>


                <div className={s.groupsContainer}>
                    <h4 className={s.title}>Мои группы:</h4>
                    {groups.map(group => {
                        return (
                            <TeacherGroup group={group}/>
                        )
                    })}
                    <NavLink style={{textDecoration: 'none'}} to="/teacherProfile/newTeam" className={s.teacherGroupWrap}>
                            <div className={s.addGroupBtn}>
                                + Добавить группу
                            </div>
                    </NavLink>

                </div>
            </div>
        )
    }
}

export default teacherProfile;