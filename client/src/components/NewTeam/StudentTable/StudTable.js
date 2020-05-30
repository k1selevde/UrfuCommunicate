import React from 'react'
import s from './StudTable.module.css'


const includeStudent = (arr, student) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].studentId === student.studentId) {
            return true;
        }
    }
    return false;
}


class StudentsTable extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.state = {
            chooseStudents: []
        }
    }

    clickHandler(student) {
        this.props.cb(student)
    }

    render() {
        const {newStudentArr} = this.props;
        return (
            <div className={s.tableWrap}>
                {newStudentArr.length > 0 ? (
                        <table className={s.table}>
                            <thead className={s.tableHead}>
                            <tr className={s.tableRow}>
                                <th className={s.index}>№</th>
                                <th className={s.fio}>ФИО</th>
                                <th className={s.group}>группа</th>
                                <th className={s.status}>статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            {newStudentArr.map((student, index) => (
                                    <tr
                                        className={s.tr}
                                        key={student.studentId}
                                    >
                                        <td className={s.indexBody}>{index + 1}</td>
                                        <td className={s.fioBody}>{student.studentName}</td>
                                        <td className={s.groupBody}>{student.group}</td>
                                        <td className={s.statusBody}>
                                            <button
                                                onClick={() => this.clickHandler(student)}
                                                className={includeStudent(this.props.studentsList, student) ? s.isAdd : s.addStudent}>
                                                {/*{includeStudent(this.props.studentsList, student) ? 'IsADD' : 'add'}*/}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                            }
                            </tbody>

                        </table>)
                    : (
                        <div className={s.nothing}>
                            По вашему запросу не найдено ничего
                        </div>
                    )
                }
            </div>
        );
    }
}

export default StudentsTable;