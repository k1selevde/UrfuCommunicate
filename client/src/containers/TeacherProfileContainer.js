import React from 'react'
import {connect} from "react-redux";
import TeacherProfile from "../components/TeacherProfile/TeacherProfile";
import {Redirect} from "react-router-dom";
import {getProfile} from "../redux/actions/teacherActions";


class TeacherProfileContainer extends React.Component {

    componentDidMount() {
        const {id,token} = this.props;
        this.props.getProfile({id,token})
    }

    render()
    {
        const {isTeacher,groups} = this.props;
        return (
            (isTeacher)
                ? <TeacherProfile groups={groups}/>
                : <Redirect to="/" />
        )
    }
}

const mapStateToProps = state => ({
    id: state.session.user.id,
    token: state.session.user.token,
    isTeacher: state.session.user.isTeacher,
    groups: state.teacher.groups
})


const mapDispatchToProps = dispatch => {
    return ({
        getProfile: (data) => dispatch(getProfile(data)),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherProfileContainer);