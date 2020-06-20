import React from 'react'
import {NavLink} from "react-router-dom";
import cn from 'classnames'
import StudTable from "./StudentTable/StudTable";
import SuccessAlert from "../Alert/SuccessAlert";
import {validSearchInput} from "../../helpers/validForm"
import StudentsList from "../Common/StudentsList/StudentsList";
import s from './NewTeam.module.css'

class NewTeam  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            description: '',
            subjectName: '',
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
        console.log(validSearchInput(searchValue))
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
        const {id, token} = this.props;
        const {teamName, description, studentsList, subjectName} = this.state;
        e.preventDefault()
        this.props.createGroup({id, token, subjectName, teamName, description, studentsList})
        console.log('subject: ', subjectName)
    }


    render() {
        const {newStudentArr, group, isDayTheme} = this.props;
        const {teamName, studentsList, subjectName, description, findError} = this.state;
        return (
            <div className={s.container}>
                <div className={s.backToProfileWrap}>
                    <NavLink className={s.backToProfile} to="/teacherProfile">Вернуться на главную</NavLink>
                </div>


                { group.isGroupCreate
                &&
                <SuccessAlert text={'Команда создана'}>
                    <NavLink
                        onClick={() => this.props.clearGroupCreate()}
                        to={`/teacherProfile/group-${group.groupId}`}
                    >
                        Перейти на страницу группы
                    </NavLink>
                </SuccessAlert>
                }

                {!group.isGroupCreate &&<div>
                    <div className={s.titleWrap}>
                        <h4 className={cn(s.title,
                            {[s.title__light]: isDayTheme}
                            )}
                        >
                            Создание новой группы
                        </h4>
                        <div className={s.makeTeamWrap}>
                            <button
                                className={cn(s.makeTeamBtn,
                                    {[s.makeTeamBtn__light]: isDayTheme}
                                )}
                                onClick={this.submitTeamDataHandler}
                                disabled={!(teamName && studentsList[0] && subjectName && description)}
                            >
                                Создать группу
                            </button>
                        </div>
                    </div>

                    <div className={s.baseInfoWrap}>
                        <div className={s.inputWrap}>
                            <label
                                htmlFor="teamName"
                                className={cn(s.inputLabel,
                                    {[s.inputLabel__light]: isDayTheme}
                                )}
                            >
                                Название команды
                            </label>
                            <input
                                id="teamName"
                                type="text"
                                value={this.state.teamName}
                                placeholder="М-2014"
                                className={s.inputName}
                                onChange={this.changeInputHandler}
                                name="teamName"
                            />
                        </div>

                        <div className={s.inputWrap}>
                            <label
                                htmlFor="description"
                                className={cn(s.inputLabel,
                                    {[s.inputLabel__light]: isDayTheme}
                                )}
                            >
                                Описание команды
                            </label>
                            <input
                                id="description"
                                type="text"
                                value={this.state.description}
                                placeholder="Лекции по предмету..."
                                className={s.inputName}
                                onChange={this.changeInputHandler}
                                name="description"
                            />
                        </div>

                        <div className={s.inputWrap}>
                            <label
                                htmlFor="subjectName"
                                className={cn(s.inputLabel,
                                    {[s.inputLabel__light]: isDayTheme}
                                )}
                            >
                                Название предмета
                            </label>
                            <input
                                id="subjectName"
                                type="text"
                                value={this.state.subjectName}
                                placeholder="Математика..."
                                className={s.inputName}
                                onChange={this.changeInputHandler}
                                name="subjectName"
                            />
                        </div>
                    </div>


                    <div className={s.box}>
                        <div className={cn(s.leftBox,
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
                            <hr/>
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

export default NewTeam;