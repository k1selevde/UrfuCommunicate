import React from 'react'
import {connect} from 'react-redux'
import Header from "../components/Header/Header";
import {clearGroupCreate, createGroup, getNewStudent} from "../redux/actions/teacherActions";
import {changeTheme} from "../redux/actions/sessionActions";

const HeaderContainer  = ({isTeacher, studentInfo, teacherInfo, ...rest}) => {
    const info = isTeacher ? teacherInfo : studentInfo;
    return (
        <Header
            info={info}
            {...rest}
        />
    );
}


const mapStateToProps = state => ({
    isTeacher: state.session.user.isTeacher,
    studentInfo: state.student.studentInfo,
    teacherInfo: state.teacher.teacherInfo,
    isDayTheme: state.session.isDayTheme
})

/*
const mapDispatchToProps = dispatch => {
    return ({
        changeTheme: (data) => dispatch(getNewStudent(data)),
    })
}
*/

export default connect(mapStateToProps, {changeTheme})(HeaderContainer);