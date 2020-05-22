import React from 'react'
import SubjectGroup from '../components/StudentProfile/SubjectGroup/SubjectGroup'
import {connect} from "react-redux";
import {getSubjectGroup} from "../redux/actions/studentActions";

class SubjectGroupContainer extends React.Component {
    componentDidMount() {
        const {subId , id, token, ...rest} = this.props;
        this.props.getSubjectGroup({subId, id , token})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.subId !== this.props.subId )
        {
            const newId = nextProps.subId;
            //console.log('groupId: ', nextProps.groupId)
            const {subId , id, token, ...rest} = this.props;
            this.props.getSubjectGroup({subId: newId, id , token})
        }
    }

    render() {
        const {...rest} = this.props;
        return (
            <SubjectGroup {...rest}/>
        )
    }
}


const mapStateToProps = state => ({
    id: state.session.user.id,
    token: state.session.user.token,
    group: state.student.activeGroup,
    error: state.student.errors
})


const mapDispatchToProps = dispatch => {
    return ({
        getSubjectGroup: (data) => dispatch(getSubjectGroup(data))
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(SubjectGroupContainer);