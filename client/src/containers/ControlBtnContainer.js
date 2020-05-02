import React from 'react'
import ControlBtn from "../components/ControlBtn/ControlBtn";
import {connect} from "react-redux";
import {logOut} from "../redux/actions/sessionActions";

const ControlBtnContainer  = ({...rest}) => {
    return (
        <ControlBtn {...rest}/>
    );
}


export default connect(null,{logOut})(ControlBtnContainer);
