import React from 'react'
import s from './StudTable.module.css'

/*
const tableHeaders = [
    '№',
    'ФИО',
    'группа',
    'статус'
]
*/


const includeStudent = (arr, student) => {
    for (let i=0; i< arr.length; i++)
    {
        if (arr[i].studentId === student.studentId)
        {
            return true;
        }
    }
    return false;
}



class StudentsTable  extends React.Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
        this.state = {
            chooseStudents: []
        }
    }

    clickHandler(student)  {
        this.props.cb(student)
        if (!this.state.chooseStudents.includes(student))
        {
            this.setState(prev => ({
                ...prev,
                chooseStudents: [
                    ...prev.chooseStudents,
                    student
                ]
            }))
        }
       // console.log(this.state)
    }

    render() {
        const {students} = this.props;
        return (
            <div className={s.tableWrap}>
                <table className={s.table}>
                    <thead className={s.tableHead}>
                    <tr className={s.tableRow}>
                        <th className={s.index} >№</th>
                        <th className={s.fio} >ФИО</th>
                        <th className={s.group} >группа</th>
                        <th className={s.status} >статус</th>

                    </tr>
                    </thead>
                    <tbody>
                    {students.length > 0 ? (
                            students.map( (student, index) => (
                                    <tr
                                        className={s.tr}
                                        key={student.studentId}
                                        style={{background: 'green'}}
                                    >
                                        <td className={s.index}>{index+1}</td>
                                        <td className={s.fio}>{student.studentName}</td>
                                        <td className={s.group}>{student.group}</td>
                                        <td className={s.status}>
                                            <button
                                                onClick={() => this.clickHandler(student)}
                                                className={includeStudent(this.state.chooseStudents, student) ? s.isAdd : s.addStudent }>
                                                {includeStudent(this.state.chooseStudents, student) ? 'IsADD' : 'add'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        ) :
                        <td colSpan={3}>
                            Nothing
                        </td>
                    }
                    </tbody>

                </table>
            </div>
        );
    }

}

export default StudentsTable;