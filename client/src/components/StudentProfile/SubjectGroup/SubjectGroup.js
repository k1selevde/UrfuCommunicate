import React from 'react'
import Chat from "../../Chat/Chat";
import {NavLink} from "react-router-dom";
import s from './SubjectGroup.module.css'
import {withSpinner} from "../../../containers/SpinnerHOC";



class SubjectGroup  extends React.Component {
    render() {
        const {group,error} = this.props
        if (group.title)
            return (
                <div className={s.SubjectGroupWrapper} key={group.groupId}>
                    <NavLink className={s.backToProfile} to="/studentProfile">
                        Вернуться на главную
                    </NavLink>
                    <div className={s.groupRow}>
                        <div className={s.leftInRow}>
                            <h3 className={s.groupTitle}>
                                <div style={{opacity: '.52', fontWeight: '400'}}>Группа</div> &nbsp; {group.title}
                            </h3>
                            <div className={s.groupDesc}>
                                {group.description}
                            </div>
                        </div>
                        <div className={s.groupTeacher}>
                            <div style={{opacity: '.52'}}>Учитель</div> &nbsp; {group.teacher}
                        </div>
                    </div>
                    <div className={s.docsWrap}>
                        <h3 className={s.docsTitle}>Документы:</h3>
                        {/*<Files />*/}
                    </div>
                    <div className={s.chatWrap}>
                        <h3 className={s.chatTitle}>Объявления:</h3>
                        <Chat messages={group.messages} teacher={group.teacher}/>
                    </div>
                </div>
            );
        else
        {
            return (
                <>
                    <NavLink className={s.backToProfile} to="/studentProfile">
                        Вернуться на главную
                    </NavLink>
                    <div className={s.errorWrap}>
                        Такой грппы не найдено
                    </div>
                </>
            )
        }
    }

}

export default withSpinner(SubjectGroup);