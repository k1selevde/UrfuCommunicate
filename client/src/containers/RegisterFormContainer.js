import React from 'react'
import {connect} from "react-redux";
import RegisterForm from "../components/Register/RegisterForm";
import {setError, hideAlert} from "../redux/actions/sessionActions";

const RegisterFormContainer  = ({...rest}) => {
    return (
        <RegisterForm {...rest} />
    );
}

const mapStateToProps = state => ({
    error: state.session.errorMsg
})

const mapDispatchToProps = dispatch => {
    return ({
        setError: (data) => dispatch(setError(data)),
        hideAlert: () => dispatch(hideAlert())
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterFormContainer);