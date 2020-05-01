import React from 'react'
import {connect} from "react-redux";
import Register from '../components/Register/Register'

const RegisterContainer = () => {
    return (
        <Register />
    )
}



export default connect()(RegisterContainer);