import React from 'react'
import TeacherGroup from '../components/TeacherProfile/TeacherGroup/TeacherGroup'
import {connect} from "react-redux";
import {getGroup, sendMessage} from "../redux/actions/teacherActions";

class TeacherGroupContainer extends React.Component {
    componentDidMount() {
        const {groupId , id, token, ...rest} = this.props;
        this.props.getGroup({groupId, id , token})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.groupId !== this.props.groupId )
        {
            const newId = nextProps.groupId;
            console.log('groupId: ', nextProps.groupId)
            const {groupId , id, token, ...rest} = this.props;
            this.props.getGroup({groupId: newId, id , token})
        }
    }

    render() {
        const {...rest} = this.props;
        return (
            <TeacherGroup {...rest}/>
        )
    }
}


const mapStateToProps = state => ({
    id: state.session.user.id,
    token: state.session.user.token,
    //isStudent: !state.session.user.isTeacher,
    //subjects: state.student.subjects,
    group: state.teacher.activeGroup,
    error: state.teacher.errors
})


const mapDispatchToProps = dispatch => {
    return ({
        getGroup: (data) => dispatch(getGroup(data)),
        sendMessage: (data) => dispatch(sendMessage(data))
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(TeacherGroupContainer);