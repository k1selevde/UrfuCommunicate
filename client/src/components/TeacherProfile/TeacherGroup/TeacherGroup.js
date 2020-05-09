import React from 'react'
import Chat from '../../Chat/Chat'
import {NavLink} from "react-router-dom";
import s from './TeacherGroup.module.css'

class TeacherGroup extends React.Component {

    render() {
        const {group,error} = this.props;
        if (error) {
            return (
                <>
                    <span className={s.error}>{error}</span>
                </>
            )
        }
        else {
            return (
                <div className={s.container}>

                    <div className={s.row}>
                        <div className={s.leftRow}>
                            <h3 className={s.groupTitle}>{group.title}</h3>
                            <div className={s.groupDesc}>{group.description}</div>
                        </div>
                        <div className={s.addStudentWrap}>
                            <NavLink to="/teacherProfile/edit" className={s.addStudentBtn}>
                                <span className={s.backToProfile}>
                                    Добавить участника
                                </span>
                            </NavLink>
                        </div>
                    </div>


                    <div className={s.docsBlock}>
                        <h3 className={s.docsTitle}>Документы</h3>
                    </div>

                    <div>send file zone</div>


                    <div className={s.messagesBlock}>
                        <h3 className={s.messagesTitle}>Объявления</h3>
                        <Chat messages={group.messages} teacher={group.teacher}/>
                    </div>

                    <div className={s.sendMsgBlock}>
                        <h3 className={s.sendMsgTitle}>Send message zone</h3>
                        <form className={s.sendMsgForm}>
                            <input
                                className={s.sendMsgInput}
                                type="text"
                                placeholder="Введит сообщение"
                            />
                            <button
                                className={s.sendMsgBtn}
                                type="submit"
                            >
                                Отправить сообщение
                            </button>
                        </form>
                    </div>

                </div>
            )
        }
    }
}

export default TeacherGroup;