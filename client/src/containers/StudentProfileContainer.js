import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import StudentProfile from '../components/StudentProfile/StudentProfile'
import {getSubjects, getSubjectGroup} from "../redux/actions/studentActions";


class StudentProfileContainer extends React.Component {

    componentDidMount() {
        const {id,token} = this.props;
        this.props.getSubjects({id,token})
    }

    render()
    {
        const {isStudent, subjects, group, error, getSubjectGroup, id, token} = this.props;
        return (
            (isStudent)
            ? <StudentProfile
                    error={error}
                    id={id} token={token}
                    getSubjectGroup={getSubjectGroup}
                    subjects={subjects}
                    group={group}
               />
            : <Redirect to="/" />
        )
    }
}


const mapStateToProps = state => ({
    id: state.session.user.id,
    token: state.session.user.token,
    isStudent: !state.session.user.isTeacher,
    subjects: state.student.subjects,
    group: state.student.activeGroup,
    error: state.student.errors
})


const mapDispatchToProps = dispatch => {
    return ({
        getSubjects: (data) => dispatch(getSubjects(data)),
        //getSubjectGroup: (data) => dispatch(getSubjectGroup(data))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfileContainer);

