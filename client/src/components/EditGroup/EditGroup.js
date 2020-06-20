import React from 'react'
import {NavLink} from "react-router-dom";
import cn from 'classnames'
import StudTable from "../NewTeam/StudentTable/StudTable";
import Alert from '../Alert/Alert'
import SuccessAlert from "../Alert/SuccessAlert";
import {validSearchInput} from "../../helpers/validForm";
import StudentsList from "../Common/StudentsList/StudentsList";
import s from '../NewTeam/NewTeam.module.css'

class EditGroup  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            studentsList: [],
            findError: false
        }
        this.changeInputHandler = this.changeInputHandler.bind(this)
        this.submitTeamDataHandler = this.submitTeamDataHandler.bind(this)
        this.removeStudentHandler = this.removeStudentHandler.bind(this)
        this.addStudentHandler = this.addStudentHandler.bind(this)
        this.findStudent = this.findStudent.bind(this)
    }

    findStudent(e) {
        const {searchValue} = this.state;
        e.preventDefault()
        let searchValidValue = validSearchInput(searchValue)
        if (searchValidValue) {
            this.props.getNewStudent({searchValidValue})
            console.log({searchValidValue});
            this.setState(prev => ({
                ...prev,
                findError: false
            }))
        } else {
            this.setState(prev => ({
                ...prev,
                findError: true
            }))
        }
    }


    includeStudent(arr, student) {
        for (let i=0; i< arr.length; i++)
        {
            if (arr[i].studentId === student.studentId)
            {
                return true;
            }
        }
        return false;
    }

    changeInputHandler(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        this.setState(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    removeStudentHandler(id) {
        this.setState(prev => ({
            ...prev,
            studentsList: prev.studentsList.filter((stud) => {
                return stud.studentId !== id;
            })
        }))
    }

    addStudentHandler(student) {
        if (!this.includeStudent(this.state.studentsList, student)) {
            this.setState(prev => ({
                ...prev,
                studentsList: [
                    ...prev.studentsList,
                    student
                ]
            }))
        }
    }

    submitTeamDataHandler(e) {
        e.preventDefault()
        console.log(this.state)
        const {id, token, group} = this.props;
        const groupId = group.groupId;
        const studentsList = this.state.studentsList;
        this.props.editGroup({id,token,groupId,studentsList})
    }

    componentDidMount() {
        console.log('Mount')
        if (!this.state.studentsList.length) {
            console.log('good')
            this.setState(prev => ({
                ...prev,
                studentsList : this.props.group.studentsList
            }))
        }
    }

    render() {
        const {newStudentArr, group, isSaveChanges, isDayTheme} = this.props;
        const {findError, studentsList} = this.state
        return (
            <div className={s.container}>
                { isSaveChanges
                &&
                <SuccessAlert text={'изменения сохранены'}>
                    <NavLink
                        onClick={() => this.props.clearSaveChanges()}
                        to={`/teacherProfile/group-${group.groupId}`}
                        style={{color: 'blue', textTransform: 'uppercase', margin: '10px'}}
                    >
                        Вернуться на страницу группы
                    </NavLink>
                </SuccessAlert>
                }

                {!isSaveChanges && <div className={s.contentEditGroup}>
                    <div className={s.titleWrap}>
                        <h4 className={cn(s.title,
                            {[s.title__light]: isDayTheme}
                        )}>
                            Редактирование команды
                        </h4>

                        <div className={s.makeTeamWrap}>
                            <button
                                className={cn(s.makeTeamBtn,
                                    {[s.makeTeamBtn__light]: isDayTheme}
                                )}
                                onClick={this.submitTeamDataHandler}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>

                    <div className={s.teamNameWrap}>
                        <h3 className={cn(s.teamNameWrap__title,
                            {[s.teamNameWrap__title__light]: isDayTheme}
                        )}
                        >
                            Команда: {group.title}
                        </h3>
                    </div>

                    <div className={s.box}>
                        <div
                            className={cn(s.leftBox,
                                {[s.leftBox__light]: isDayTheme}
                            )}
                        >
                            <form onSubmit={this.findStudent} className={s.searchForm}>
                                <div className={s.findErrorWrap}>
                                    {findError &&
                                    <label className={s.findError} htmlFor="search">Введите только фамилию</label>
                                }
                                </div>
                                <div className={s.findInputWrap}>
                                    <button type="submit" className={s.sendFormBtn}></button>
                                    <input
                                        name="searchValue"
                                        placeholder="Фамилия студента"
                                        type="search"
                                        id="search"
                                        onChange={this.changeInputHandler}
                                        value={this.state.searchValue}
                                        className={s.searchInput}
                                    />
                                </div>
                            </form>

                            <StudTable
                                newStudentArr={newStudentArr}
                                studentsList={this.state.studentsList}
                                cb={(student) => this.addStudentHandler(student)}

                            />

                        </div>
                        <StudentsList
                            studentsList={studentsList}
                            removeStudentCB={this.removeStudentHandler}
                            removable={true}
                            isDayTheme={isDayTheme}
                        />
                    </div>
                </div>}
            </div>
        );
    }
}

export default EditGroup;