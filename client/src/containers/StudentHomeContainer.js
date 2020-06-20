import React from 'react'
import StudentHome from "../components/StudentProfile/StudentHome/StudentHome";
import {connect} from "react-redux";

const StudentHomeContainer  = ({isDayTheme}) => {
    return (
        <StudentHome isDayTheme={isDayTheme}/>
    );
}

const mapStateToProps = state => ({
    isDayTheme: state.session.isDayTheme
})

export default connect(mapStateToProps)(StudentHomeContainer);