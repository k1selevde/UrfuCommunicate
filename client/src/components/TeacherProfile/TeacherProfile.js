import React from 'react'
import TeacherGroupLink from "./TeacherGroupLink/TeacherGroupLink";
import {TeacherRoutes} from "./TeacherRoutes";
import {NavLink} from 'react-router-dom'
import s from './Teacher.module.css'
import b from './TeacherGroupLink/GroupLink.module.css'
import cn from 'classnames'

class teacherProfile extends React.Component {
    constructor(props) {
        super(props)
        this.clearGroupHandler = this.clearGroupHandler.bind(this)
    }

    clearGroupHandler() {
        this.props.clearGroup()
    }

    render() {
        const {groups,isDayTheme} = this.props
        return (
            <div className={s.groupContainer}
                 //className={s.mainContainer}
            >
                <div className={s.groupsContainer}>
                    <h4 className={s.title}>Мои группы</h4>
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
                        activeClassName={b.teacherGroupWrapActive}
                    >
                        <div className={s.addGroupBtn}>
                            <div className={s.addGroupBtnIcon}></div>
                            <div className={s.addGroupBtnText}> &nbsp; Добавить группу</div>
                        </div>
                    </NavLink>
                </div>
                <div className={cn(s.content, {[s.content__light]: isDayTheme})} >
                    <TeacherRoutes />
                </div>

            </div>
        )
    }
}

export default teacherProfile;