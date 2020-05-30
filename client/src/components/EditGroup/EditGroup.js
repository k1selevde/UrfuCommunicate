import React from 'react'
import {NavLink} from "react-router-dom";
import StudTable from "../NewTeam/StudentTable/StudTable";
import Alert from '../Alert/Alert'
import SuccessAlert from "../Alert/SuccessAlert";
import s from '../NewTeam/NewTeam.module.css'
import {validSearchInput} from "../../helpers/validForm";

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
        const {newStudentArr, group, error, isSaveChanges} = this.props;
        const {findError} = this.state
        return (
            <div className={s.container}>
                {/*{error && <Alert error={error}/>}*/}
                { isSaveChanges
                &&
                <SuccessAlert text={'изменения сохранены'}>
                    <NavLink
                        onClick={() => this.props.clearSaveChanges()}
                        to={`/teacherProfile/group-${group.groupId}`}
                    >
                        Вернуться на страницу группы
                    </NavLink>
                </SuccessAlert>
                }

                {!isSaveChanges && <div className={s.contentEditGroup}>
                    <div className={s.titleWrap}>
                        <h4 className={s.title}>Редактирование команды</h4>

                        <div className={s.makeTeamWrap}>
                            <button
                                className={s.makeTeamBtn}
                                onClick={this.submitTeamDataHandler}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>

                    <div className={s.teamNameWrap}>
                        <h3 style={{color: 'white'}}>Команда: {group.title}</h3>
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

                            <StudTable
                                newStudentArr={newStudentArr}
                                studentsList={this.state.studentsList}
                                cb={(student) => this.addStudentHandler(student)}

                            />

                        </div>


                        <div className={s.listWrap}>
                            <div className={s.listItemsWrap}>
                                <h4 className={s.studentListTitle}>
                                    Спиок добавленных студентов
                                </h4>
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

export default EditGroup;