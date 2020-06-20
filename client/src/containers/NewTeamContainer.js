import React from 'react'
import NewTeam from '../components/NewTeam/NewTeam'
import {getNewStudent, createGroup, clearGroupCreate} from "../redux/actions/teacherActions";
import {connect} from "react-redux";

const NewTeamContainer  = ({...rest}) => {
    return (
        <NewTeam {...rest} />
    );
}

const mapStateToProps = state => ({
    id: state.session.user.id,
    token: state.session.user.token,
    newStudentArr: state.teacher.newStudent,
    group: state.teacher.activeGroup,
    isDayTheme: state.session.isDayTheme
})


const mapDispatchToProps = dispatch => {
    return ({
        getNewStudent: (data) => dispatch(getNewStudent(data)),
        createGroup: (data) => dispatch(createGroup(data)),
        clearGroupCreate: () => dispatch(clearGroupCreate())
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(NewTeamContainer);