import React from 'react'
import Chat from '../../Chat/Chat'
import {NavLink} from "react-router-dom";
import s from './TeacherGroup.module.css'
import {withSpinner} from "../../../containers/SpinnerHOC";
import Files from "../../FIles/Files";

class TeacherGroup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newMessage: ''
        }

        this.changeMessageHandler = this.changeMessageHandler.bind(this)
        this.sendMessageHandler = this.sendMessageHandler.bind(this)
        this.sendFileHandler = this.sendFileHandler.bind(this)
        //refs:
        this.fileRef = React.createRef();

    }


    changeMessageHandler(e) {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        this.setState((prev) => ({
                ...prev,
                [fieldName]: fieldValue
            })
        )
    }

    sendMessageHandler(e) {
        e.preventDefault()
        const {group, token} = this.props;
        const groupId = group.groupId;
        const msg = this.state.newMessage;
        if (msg) {
            this.props.sendMessage({groupId,token,msg})
        }
        this.setState((prev)=> ({
            ...prev,
            newMessage: ''
        }))
    }

    sendFileHandler = async e => {
        const {group} = this.props;
        const id = group.groupId;
        const fd2 = new FormData(this.fileRef.current)
        fd2.append('teamId', id)
        e.preventDefault()
        console.log(this.fileRef.current)
        console.log(fd2)
        this.props.sendFile(fd2)
    }

    render() {
        const {group, error, files, getFile} = this.props;
        const {newMessage} = this.state;
        if (group.title) {
            return (
                <div className={s.container}>
                    <NavLink className={s.backToProfile} to="/teacherProfile">
                        Вернуться на главную
                    </NavLink>
                    <div className={s.row}>
                        <div className={s.leftRow}>
                            <h3 className={s.groupTitle}>{group.title}</h3>
                            <div className={s.groupDesc}>{group.description}</div>
                        </div>
                        <div className={s.addStudentWrap}>
                            <NavLink to="/teacherProfile/edit" className={s.addStudentBtn}>
                                <span>
                                    Добавить участника
                                </span>
                            </NavLink>
                        </div>
                    </div>


                    <div className={s.docsBlock}>
                        <h3 className={s.docsTitle}>Документы</h3>
                        <Files
                            files={files}
                            teamId={group.groupId}
                            getFile={getFile}
                        />
                    </div>

                    <div className={s.sendFileBlock}>
                        <form
                            ref={this.fileRef}
                            onSubmit={this.sendFileHandler}
                            className={s.sendFileForm}
                        >
                            <input
                                type="file"
                                name="filedata"
                            />
                            <input
                                type="submit"
                                value="ОТПРАВИТЬ"
                                className={s.sendFileBtn}
                            />
                        </form>
                    </div>

                    <div className={s.messagesBlock}>
                        <h3 className={s.messagesTitle}>Объявления</h3>
                        <Chat messages={group.messages} teacher={group.teacher}/>
                    </div>

                    <div className={s.sendMsgBlock}>
                        <h3 className={s.sendMsgTitle}>Send message zone</h3>
                        <form
                            onSubmit={this.sendMessageHandler}
                            className={s.sendMsgForm}>
                            <textarea
                                value={this.state.newMessage}
                                onChange={this.changeMessageHandler}
                                className={s.sendMsgInput}
                                type="text"
                                name="newMessage"
                                placeholder="Введите сообщение"
                            />
                            <button
                                className={s.sendMsgBtn}
                                type="submit"
                                disabled={!newMessage}
                            >
                                Отправить сообщение
                            </button>
                        </form>
                    </div>

                </div>
            )
        }
        else {
            return (
                <>
                    <NavLink className={s.backToProfile} to="/teacherProfile">
                        Вернуться на главную
                    </NavLink>
                    <div className={s.error}>Такой группы не найдено</div>
                </>

            )
        }
    }
}

export default withSpinner(TeacherGroup, true);