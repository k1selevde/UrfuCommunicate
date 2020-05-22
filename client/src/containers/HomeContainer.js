import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Home from "../components/Home/Home";


class HomeContainer extends React.Component {
    render() {
        const {isAuth,isTeacher} = this.props;
        console.log('isAuth',isAuth, isTeacher)
        return (
            (!isAuth)
                ? (<Home />)
                : ((isTeacher) ? <Redirect to="/teacherProfile" />
                : <Redirect to="/studentProfile" /> )
        )
    }
}

const mapStateToProps = state => ({
    isTeacher: state.session.user.isTeacher,
    isAuth: state.session.user.isAuth
})


export default connect(mapStateToProps,null)(HomeContainer);