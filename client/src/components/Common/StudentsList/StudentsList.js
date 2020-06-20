import React from 'react'
import cn from 'classnames'
import s from './StudentsList.module.css'

const StudentsList  = ({studentsList, removeStudentCB,removable,isDayTheme}) => {
    return (
        <div className={s.listWrap}>
            <div className={cn(s.listItemsWrap, {[s.listItemsWrap__light]: isDayTheme})}>
                <h4 className={cn(s.studentListTitle, {[s.studentListTitle__light]: isDayTheme})}>
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