import React from 'react'
import TeacherHome from "../components/TeacherProfile/TeacherHome/TeacherHome";
import {connect} from "react-redux";


const  TeacherHomeContainer = ({isDayTheme}) => {
    return (
        <TeacherHome isDayTheme={isDayTheme} />
    );
}

const mapStateToProps = (state) => ({
    isDayTheme: state.session.isDayTheme
})

export default connect(mapStateToProps)(TeacherHomeContainer);