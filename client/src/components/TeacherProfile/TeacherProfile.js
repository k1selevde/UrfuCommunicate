import React from 'react'
import TeacherGroupLink from "./TeacherGroupLink/TeacherGroupLink";
import {TeacherRoutes} from "./TeacherRoutes";
import {NavLink} from 'react-router-dom'
import s from './Teacher.module.css'
import b from './TeacherGroupLink/GroupLink.module.css'


class teacherProfile extends React.Component {
    constructor(props) {
        super(props)
        this.clearGroupHandler = this.clearGroupHandler.bind(this)
    }

    clearGroupHandler() {
        this.props.clearGroup()
    }

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
                            <TeacherGroupLink group={group}/>
                        )
                    })}
                    <NavLink
                        onClick={this.clearGroupHandler}
                        style={{textDecoration: 'none'}}
                        to="/teacherProfile/newGroup"
                        className={b.teacherGroupWrap}
                    >
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