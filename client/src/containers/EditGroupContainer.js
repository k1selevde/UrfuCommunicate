import React from 'react'
import {connect} from "react-redux";
import {getNewStudent, editGroup, clearSaveChanges} from "../redux/actions/teacherActions";
import EditGroup from '../components/EditGroup/EditGroup'


const EditGroupContainer  = ({...rest}) => {
    return (
        <EditGroup {...rest} />
    );
}

const mapStateToProps = state => ({
    id: state.session.user.id,
    token: state.session.user.token,
    group: state.teacher.activeGroup,
    newStudentArr: state.teacher.newStudent,
    error: state.teacher.errors,
    isSaveChanges: state.teacher.activeGroup.saveChanges
})


const mapDispatchToProps = dispatch => {
    return ({
        getNewStudent: (data) => dispatch(getNewStudent(data)),
        editGroup: (data) => dispatch(editGroup(data)),
        clearSaveChanges: () => dispatch(clearSaveChanges())
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(EditGroupContainer);