import React from 'react'
import NewTeam from '../components/NewTeam/NewTeam'
import {getNewStudent} from "../redux/actions/teacherActions";
import {connect} from "react-redux";

const NewTeamContainer  = ({...rest}) => {
    return (
        <NewTeam {...rest} />
    );
}

const mapStateToProps = state => ({
    newStudentArr: state.teacher.newStudent
})


const mapDispatchToProps = dispatch => {
    return ({
            getNewStudent: (data) => dispatch(getNewStudent(data)),
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(NewTeamContainer);