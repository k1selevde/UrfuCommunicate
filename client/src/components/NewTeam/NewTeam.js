import React from 'react'
import {NavLink} from "react-router-dom";
import StudTable from "./StudentTable/StudTable";
import SuccessAlert from "../Alert/SuccessAlert";
import {validSearchInput} from "../../helpers/validForm"
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
        const {newStudentArr, group} = this.props;
        const {teamName, studentsList, subjectName, description, findError} = this.state;
        return (
            <div className={s.container}>
                <NavLink className={s.backToProfile} to="/teacherProfile">Вернуться на главную</NavLink>


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
                        <h4 className={s.title}>Создание новой команды</h4>
                        <div className={s.makeTeamWrap}>
                            <button
                                className={s.makeTeamBtn}
                                onClick={this.submitTeamDataHandler}
                                disabled={!(teamName && studentsList[0] && subjectName && description)}
                            >
                                Создать команду
                            </button>
                        </div>
                    </div>

                    <div className={s.baseInfoWrap}>
                        <div className={s.inputWrap}>
                            <label
                                htmlFor="teamName"
                                className={s.inputLabel}
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
                                className={s.inputLabel}
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
                                className={s.inputLabel}
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
                        <div className={s.leftBox}>
                            <form onSubmit={this.findStudent} className={s.searchForm}>
                                {findError &&
                                <label className={s.findError} htmlFor="search">Введите только фамилию</label>
                                }
                                <div className={s.findInputWrap}>
                                    <button type="submit" className={s.sendFormBtn}></button>
                                    <input
                                        name="searchValue"
                                        placeholder="Фамилия студента"
                                        type="search"
                                        id="search"
                                        onChange={this.changeInputHandler}
                                        value={this.state.searchValue}
                                        className={findError ? s.searchInputError : s.searchInput}
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



                        <div className={s.listWrap}>
                            <div className={s.listItemsWrap}>
                                <h4 className={s.studentListTitle}>
                                    Список добавленных студентов
                                </h4>
                                <hr/>
                                {this.state.studentsList.length > 0
                                    ? (
                                        <div>
                                            {this.state.studentsList.map((stud, index) => {
                                                return (
                                                    <div
                                                        key={stud.studentId}
                                                        className={s.listItem}
                                                    >
                                                        <div className={s.studentItemLeft}>
                                                            <div className={s.studentIndex}>{index + 1})</div>
                                                            <div className={s.studentName}>
                                                                {stud.studentName}
                                                            </div>
                                                        </div>
                                                        <div
                                                            onClick={() => this.removeStudentHandler(stud.studentId)}
                                                            className={s.studentFlag}
                                                        >
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                    )
                                    :
                                    (<div className={s.emptyStudentList}>Список пуст</div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default NewTeam;