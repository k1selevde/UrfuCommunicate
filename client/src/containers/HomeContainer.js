import React from 'react'
import {connect} from "react-redux";
import Home from "../components/Home/Home";

class HomeContainer extends React.Component {
    render() {
        return ( <Home /> )
    }
}

export default connect()(HomeContainer);