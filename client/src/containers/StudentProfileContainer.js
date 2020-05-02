import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import StudentProfile from '../components/StudentProfile/StudentProfile'
import {getSubjects} from "../redux/actions/studentActions";

class StudentProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getSubjects()
    }

    render()
    {
        const {isStudent, ...rest} = this.props;
        return (
            (isStudent)
            ? <StudentProfile {...rest}/>
            : <Redirect to="/" />
        )
    }
}

const mapStateToProps = state => ({
    //isAuth: state.session.user.isAuth,
    isStudent: !state.session.user.isTeacher,
    subjects: state.student.subjects
})


export default connect(mapStateToProps, {getSubjects})(StudentProfileContainer);

