import React from 'react'
import {NavLink} from "react-router-dom";
import cn from 'classnames';
import Chat from '../../Chat/Chat'
import {withSpinner} from "../../../containers/SpinnerHOC";
import Files from "../../FIles/Files";
import StudentsList from "../../Common/StudentsList/StudentsList";
import s from './TeacherGroup.module.css'

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
        const {group, getFile, studentsList, isDayTheme, deleteFile} = this.props;
        const {newMessage} = this.state;
        if (group.title) {
            return (
                <div className={s.container}>
                    <div className={s.backToProfileWrap}>
                        <NavLink className={s.backToProfile} to="/teacherProfile">
                        Вернуться на главную
                        </NavLink>
                    </div>
                    <div>
                            <h3
                                className={cn(s.groupTitle,{[s.groupTitle__light]: isDayTheme})}>
                                {group.title}
                            </h3>
                            <p
                                className={cn(s.groupDesc,{[s.groupDesc__light]: isDayTheme})}>
                                {group.description}
                            </p>

                    </div>


                    <div className={s.row}>
                        <div>
                            <div className={s.docsBlock}>
                                <h3
                                    className={cn(s.docsTitle, {[s.docsTitle__light]: isDayTheme})}>
                                    Документы
                                </h3>
                                <Files
                                    files={group.files}
                                    teamId={group.groupId}
                                    getFile={getFile}
                                    deleteFile={deleteFile}
                                    isDayTheme={isDayTheme}
                                    isTeacher={true}
                                />
                            </div>

                            <div className={cn(s.sendFileBlock,
                                {[s.sendFileBlock__light]: isDayTheme}
                            )}
                            >
                                <form
                                    ref={this.fileRef}
                                    onSubmit={this.sendFileHandler}
                                    className={s.sendFileForm}
                                >
                                    <input
                                        className={s.sendFileInput}
                                        type="file"
                                        accept="application/pdf"
                                        name="filedata"
                                    />
                                    <input
                                        type="submit"
                                        value="ОТПРАВИТЬ"
                                        className={cn(s.sendFileBtn,
                                            {[s.sendFileBtn__light]: isDayTheme}
                                        )}
                                    />
                                </form>
                            </div>
                        </div>
                        <div className={s.addStudentWrap}>
                            <StudentsList
                                studentsList={studentsList}
                                removable={false}
                                isDayTheme={isDayTheme}
                            />

                            <div className={s.addStudentBtnWrap}>
                                <NavLink to="/teacherProfile/edit"
                                         className={cn(s.addStudentBtn,
                                                {[s.addStudentBtn__light]: isDayTheme}
                                             )}
                                >
                                    <span>
                                        Добавить участника
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className={s.messagesBlock}>
                        <h3
                            className={cn(s.messagesTitle,
                                {[s.messagesTitle__light]: isDayTheme}
                                )}
                        >
                            Объявления
                        </h3>
                        <Chat
                            messages={group.messages}
                            teacher={group.teacher}
                            isDayTheme={isDayTheme}
                        />
                    </div>

                    <div className={s.sendMsgBlock}>
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