import React from 'react'
import {connect} from 'react-redux'
import Header from "../components/Header/Header";

const HeaderContainer  = ({isTeacher, studentInfo, teacherInfo}) => {
    const info = isTeacher ? teacherInfo : studentInfo;
    return (
        <Header info={info}/>
    );
}


const mapStateToProps = state => ({
    isTeacher: state.session.user.isTeacher,
    studentInfo: state.student.studentInfo,
    teacherInfo: state.teacher.teacherInfo
})


export default connect(mapStateToProps)(HeaderContainer);