import React from 'react'
import s from './SubjectGroup.module.css'
import Chat from "../../Chat/Chat";

/*
const defaultGroup = {
    groupId: 'weqweqweqwe',
    title: 'eqweqwewqewe',
    description: '',
    teacher: '',
}
*/


const SubjectGroup  = ({group,error}) => {
    if (group.title)
        return (
            <div className={s.SubjectGroupWrapper} key={group.groupId}>
                <div className={s.groupRow}>
                    <div className={s.leftInRow}>
                        <h3 className={s.groupTitle}>
                            Группа: &nbsp; {group.title}
                        </h3>
                        <div className={s.groupDesc}>
                            {group.description}
                        </div>
                    </div>
                    <div className={s.groupTeacher}>
                        Учитель: &nbsp; {group.teacher}
                    </div>
                </div>
                <div className={s.docsWrap}>
                    <h3 className={s.docsTitle}>Документы:</h3>
                </div>
                <div className={s.chatWrap}>
                    <h3 className={s.chatTitle}>Объявления:</h3>
                    <Chat messages={group.messages} teacher={group.teacher}/>
                </div>

            </div>
        );
    else
    {
        return (
            <div className={s.errorWrap}>
                {error}
            </div>
        )
    }
}

export default SubjectGroup;