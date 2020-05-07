import React from 'react'
import ControlBtn from "../components/ControlBtn/ControlBtn";
import {connect} from "react-redux";
import {logOut} from "../redux/actions/sessionActions";
import {teacherOut} from "../redux/actions/teacherActions";
import {studentOut} from "../redux/actions/studentActions";

const ControlBtnContainer  = ({...rest}) => {
    return (
        <ControlBtn {...rest}/>
    );
}


export default connect(null,{logOut,teacherOut,studentOut})(ControlBtnContainer);
