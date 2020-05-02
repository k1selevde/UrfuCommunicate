import React from 'react'
import {connect} from "react-redux";
import TeacherProfile from "../components/TeacherProfile/TeacherProfile";
import {Redirect} from "react-router-dom";

class TeacherProfileContainer extends React.Component {
    render()
    {
        const {isTeacher} = this.props;
        return (
            (isTeacher)
                ? <TeacherProfile />
                : <Redirect to="/" />
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.session.user.isAuth,
    isTeacher: state.session.user.isTeacher
})

export default connect(mapStateToProps)(TeacherProfileContainer);