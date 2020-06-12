import React from 'react'
import s from './StudentsList.module.css'

const StudentsList  = ({studentsList, removeStudentCB,removable}) => {
    return (
        <div className={s.listWrap}>
            <div className={s.listItemsWrap}>
                <h4 className={s.studentListTitle}>
                    Список добавленных студентов
                </h4>
                {studentsList.length > 0
                    ? (
                        <div>
                            {studentsList.map((stud, index) => {
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
                                        {removable && <div
                                            onClick={() => removeStudentCB(stud.studentId)}
                                            className={s.studentFlag}
                                        >
                                        </div>}
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
    );
}

export default StudentsList;