import React from 'react'
import {connect} from "react-redux";
import {getNewStudent} from "../redux/actions/teacherActions";
import EditGroup from '../components/EditGroup/EditGroup'


const EditGroupContainer  = ({...rest}) => {
    return (
        <EditGroup {...rest} />
    );
}

const mapStateToProps = state => ({
    group: state.teacher.activeGroup,
    newStudentArr: state.teacher.newStudent
})


const mapDispatchToProps = dispatch => {
    return ({
        getNewStudent: (data) => dispatch(getNewStudent(data)),
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(EditGroupContainer);